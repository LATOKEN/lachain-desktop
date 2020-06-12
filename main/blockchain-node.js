/* eslint-disable no-console */
const path = require('path')
const fs = require('fs-extra')
const {spawn} = require('child_process')
const axios = require('axios')
const progress = require('progress-stream')
const semver = require('semver')
const kill = require('tree-kill')
const lineReader = require('reverse-line-reader')
// eslint-disable-next-line import/no-extraneous-dependencies
const appDataPath = require('./app-data-path')

const nodeBin = 'node-go'
const nodeNodeReleasesUrl =
  'https://api.github.com/repos/node-network/node-go/releases/latest'
const nodeChainDbFolder = 'nodechain.db'

const getBinarySuffix = () => (process.platform === 'win32' ? '.exe' : '')

const getNodeDir = () => path.join(appDataPath('userData'), 'node')

const getNodeDataDir = () => path.join(getNodeDir(), 'datadir')

// const getNodeFile = () => path.join(getNodeDir(), nodeBin + getBinarySuffix())
const getNodeFile = () =>
  '~/Projects/latoken/lachain/blockchain/dist/linux-x64/Lachain-x86_64.AppImage'

// const getNodeConfigFile = () => path.join(getNodeDir(), 'config.json')
const getNodeConfigFile = () =>
  '~/Projects/latoken/lachain/blockchain/src/Lachain.Console/config.json'

const getTempNodeFile = () =>
  path.join(getNodeDir(), `new-${nodeBin}${getBinarySuffix()}`)

const getNodeChainDbFolder = () =>
  path.join(getNodeDataDir(), nodeChainDbFolder)

// const getNodeLogsFile = () => path.join(getNodeDataDir(), 'logs', 'output.log')
const getNodeLogsFile = () => path.join(appDataPath('logs'), 'node-output.log')

// const getNodeErrorFile = () => path.join(getNodeDataDir(), 'logs', 'error.log')
const getNodeErrorFile = () => path.join(appDataPath('logs'), 'node-error.log')

const getReleaseUrl = async () => {
  const {data} = await axios.get(nodeNodeReleasesUrl)
  let assetName = 'node-node-linux'
  switch (process.platform) {
    case 'win32':
      assetName = 'node-node-win'
      break
    case 'darwin':
      assetName = 'node-node-mac'
      break
    default:
  }

  const asset = data.assets.filter(x => x.name.startsWith(assetName))

  return asset.length ? asset[0].browser_download_url : null
}

const getRemoteVersion = async () => {
  try {
    const {
      data: {tag_name: tag},
    } = await axios.get(nodeNodeReleasesUrl)
    return semver.clean(tag)
  } catch (e) {
    return null
  }
}

async function downloadNode(onProgress) {
  return new Promise(async (resolve, reject) => {
    try {
      const url = await getReleaseUrl()
      const version = await getRemoteVersion()

      if (!fs.existsSync(getNodeDir())) {
        fs.mkdirSync(getNodeDir())
      }

      const writer = fs.createWriteStream(getTempNodeFile())
      writer.on('finish', () => writer.close(() => resolve(version)))
      writer.on('error', reject)

      const response = await axios.request({
        method: 'get',
        url,
        responseType: 'stream',
      })

      const str = progress({
        time: 1000,
        length: parseInt(response.headers['content-length'], 10),
      })

      str.on('progress', function(p) {
        onProgress({...p, version})
      })

      response.data.pipe(str).pipe(writer)
    } catch (error) {
      return reject(error)
    }
  })
}

function writeError(err) {
  try {
    fs.appendFileSync(
      getNodeErrorFile(),
      `-- node error, time: ${new Date().toUTCString()} --\n${err}\n -- end of error -- \n`
    )
  } catch (e) {
    console.log(`cannot write error to file: ${e.toString()}`)
  }
}

async function startNode(
  port,
  tcpPort,
  ipfsPort,
  apiKey,
  useLogging = true,
  onLog,
  onExit
) {
  const paramters = [
    '--datadir',
    getNodeDataDir(),
    '--rpcport',
    port,
    '--port',
    tcpPort,
    '--ipfsport',
    ipfsPort,
  ]
  // const version = await getCurrentVersion(false)
  paramters.push('--apikey')
  paramters.push(apiKey)
  const configFile = getNodeConfigFile()
  if (fs.existsSync(configFile)) {
    paramters.push('--config')
    paramters.push(configFile)
  }
  const nodeProcess = spawn(getNodeFile(), paramters)
  console.log('node starting...')

  nodeProcess.stdout.on('data', data => {
    const str = data.toString()
    if (onLog) onLog(str.split('\n').filter(x => x))
    if (useLogging) {
      console.log(str)
    }
  })

  nodeProcess.stderr.on('data', err => {
    const str = err.toString()
    writeError(str)
    if (onLog) onLog(str.split('\n').filter(x => x))
    if (useLogging) {
      console.error(str)
    }
  })

  nodeProcess.on('exit', code => {
    if (useLogging) {
      console.info(`child process exited with code ${code}`)
    }
    if (onExit) {
      onExit(`node stopped with code ${code}`, code)
    }
  })

  return nodeProcess
}

async function stopNode(node) {
  console.log('RECEIVED: node stopping: ', node.pid)
  return new Promise(async (resolve, reject) => {
    try {
      if (!node) {
        return resolve('node process not found')
      }
      if (node.exitCode != null) {
        return resolve(`node already exited with code ${node.exitCode}`)
      }
      if (process.platform !== 'win32') {
        kill(node.pid, 'SIGINT', function(err) {
          if (err) {
            return reject(err)
          }
          console.log(`node ${node.pid} stopped successfully`)
          return resolve(`node ${node.pid} stopped successfully`)
        })
      } else {
        console.log(`node ${node.pid} stopped successfully`)
        node.on('exit', () => resolve(`node ${node.pid} stopped successfully`))
        node.on('error', reject)
        node.kill()
      }
    } catch (e) {
      return reject(e)
    }
  })
}

function getCurrentVersion(tempNode) {
  return new Promise((resolve, reject) => {
    const node = tempNode ? getTempNodeFile() : getNodeFile()

    try {
      const nodeVersion = spawn(node, ['--version'])
      nodeVersion.stdout.on('data', data => {
        const {version} = semver.coerce(data.toString())
        return semver.valid(version)
          ? resolve(version)
          : reject(
              new Error(
                `cannot resolve node version, stdout: ${data.toString()}`
              )
            )
      })

      nodeVersion.stderr.on('data', data =>
        reject(
          new Error(`cannot resolve node version, stderr: ${data.toString()}`)
        )
      )

      nodeVersion.on('exit', code => {
        if (code) {
          return reject(
            new Error(`cannot resolve node version, exit code ${code}`)
          )
        }
      })

      nodeVersion.on('error', err => reject(err))
    } catch (e) {
      return reject(e)
    }
  })
}

function updateNode() {
  return new Promise(async (resolve, reject) => {
    // try {
    //   const currentNode = getNodeFile()
    //   const tempNode = getTempNodeFile()
    //   let num = 5
    //   let done = false
    //   while (num > 0) {
    //     try {
    //       if (fs.existsSync(currentNode)) {
    //         fs.unlinkSync(currentNode)
    //       }
    //       done = true
    //     } catch (e) {
    //       await sleep(1000)
    //     } finally {
    //       num -= 1
    //     }
    //   }
    //   if (!done) {
    //     return reject(new Error('cannot remove old node-go file'))
    //   }
    //
    //   fs.renameSync(tempNode, currentNode)
    //   if (process.platform !== 'win32') {
    //     fs.chmodSync(currentNode, '755')
    //   }
    //   return resolve()
    // } catch (e) {
    //   return reject(e)
    // }
    resolve()
  })
}

function nodeExists() {
  return fs.existsSync(getNodeFile())
}

function cleanNodeState() {
  const chainDbDirectory = getNodeChainDbFolder()
  if (fs.existsSync(chainDbDirectory)) {
    fs.removeSync(chainDbDirectory)
  }
}

function getLastLogs() {
  const number = 100
  return new Promise((resolve, reject) => {
    try {
      const logs = []
      lineReader.eachLine(getNodeLogsFile(), function(line, last) {
        logs.push(line)
        if (logs.length === number || last) {
          resolve(logs.reverse())
          return false
        }
        return true
      })
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = {
  downloadNode,
  getCurrentVersion,
  getRemoteVersion,
  startNode,
  stopNode,
  updateNode,
  nodeExists,
  cleanNodeState,
  getLastLogs,
}