/* eslint-disable no-console */
const path = require('path')
const fs = require('fs-extra')
const {spawn} = require('child_process')
const axios = require('axios')
const progress = require('progress-stream')
const semver = require('semver')
const kill = require('tree-kill')
const lineReader = require('reverse-line-reader')
const crypto = require('crypto')
const keccak = require('keccak256')
// eslint-disable-next-line import/no-extraneous-dependencies
const rimraf = require('rimraf')
const appDataPath = require('./app-data-path')
const {sleep} = require('./utils')
const defaultConfigDevNet = require('./default-config-devNet.json')
const defaultConfigTestNet = require('./default-config-testNet.json')
const logger = require('./logger')

const nodeBin = 'node'
const nodeNodeReleasesUrl =
  'https://api.github.com/repos/LATOKEN/lachain/releases'

const getBinarySuffix = () => (process.platform === 'win32' ? '.exe' : '')

let nodeModeData = null
let globalNodeMode = 1 // default testNet
function changeNodeMode(mode) {
  switch (mode) {
    case 1: {
      nodeModeData = path.join(appDataPath('userData'), 'testNet')
      globalNodeMode = 1
      break
    }
    case 2: {
      nodeModeData = path.join(appDataPath('userData'), 'devNet')
      globalNodeMode = 2
      break
    }
    default: {
      nodeModeData = path.join(appDataPath('userData'), 'testNet')
    }
  }
}

const getNodeDir = () => path.join(nodeModeData, 'node')

const getNodeDataDir = () => path.join(getNodeDir(), 'ChainLachain')

const getNodeFile = () => path.join(getNodeDir(), nodeBin + getBinarySuffix())

const getNodeConfigFile = () => path.join(getNodeDir(), 'config.json')

const getNodeWalletFile = () => path.join(getNodeDir(), 'wallet.json')

const getTempNodeFile = () =>
  path.join(getNodeDir(), `new-${nodeBin}${getBinarySuffix()}`)

const getNodeLogsFile = () => path.join(getNodeDir(), 'logs', 'output.log')

const getNodeErrorFile = () => path.join(getNodeDir(), 'logs', 'error.log')

const getReleaseUrl = async nodeMode => {
  const {data} = await axios.get(nodeNodeReleasesUrl)
  let filteredData = null
  if (data && data.length) {
    for (let i = 0; i < data.length; i += 1) {
      if (nodeMode && nodeMode === 2) {
        if (data[i].tag_name.indexOf('stable') < 0) {
          filteredData = data[i]
          break
        }
      } else if (data[i].tag_name.indexOf('stable') > 0) {
        filteredData = data[i]
        break
      }
    }
  }

  let assetName = 'lachain-linux-x64'
  switch (process.platform) {
    case 'win32':
      assetName = 'lachain-win-x64'
      break
    case 'darwin':
      assetName = 'lachain-osx-x64'
      break
    default:
  }

  const asset = filteredData.assets.filter(x => x.name.startsWith(assetName))
  return asset.length ? asset[0].browser_download_url : null
}

const getRemoteVersion = async () => {
  logger.info('getRemoteVersion')
  try {
    // const {
    //   data: {tag_name: tag},
    // } = await axios.get(nodeNodeReleasesUrl)
    const {data} = await axios.get(nodeNodeReleasesUrl)
    let dataVersion = null
    for (let i = 0; i < data.length; i += 1) {
      if (globalNodeMode && globalNodeMode === 2) {
        if (data[i].tag_name.indexOf('stable') < 0) {
          dataVersion = data[i].tag_name
          break
        }
      } else if (data[i].tag_name.indexOf('stable') > 0) {
        dataVersion = data[i].tag_name
        break
      }
    }
    return semver.clean(dataVersion)
  } catch (e) {
    logger.info('getRemoteVersion error', e.toString())
    return null
  }
}

async function purgeNode(nodeMode) {
  changeNodeMode(+nodeMode)
  return new Promise(async (resolve, reject) => {
    try {
      logger.info('PURGING NODE')
      if (fs.existsSync(getNodeDataDir())) {
        logger.info('Delete', getNodeDataDir())
        rimraf.sync(getNodeDataDir())
      }
      if (fs.existsSync(getNodeLogsFile())) {
        logger.info('Delete', getNodeLogsFile())
        rimraf.sync(getNodeLogsFile())
      }
      if (fs.existsSync(getNodeErrorFile())) {
        logger.info('Delete', getNodeErrorFile())
        rimraf.sync(getNodeErrorFile())
      }
      // if (fs.existsSync(getNodeConfigFile())) {
      //   logger.info('Delete', getNodeConfigFile())
      //   rimraf.sync(getNodeConfigFile())
      // }
      if (fs.existsSync(getNodeFile())) {
        logger.info('Delete', getNodeFile())
        rimraf.sync(getNodeFile())
      }
      resolve()
    } catch (e) {
      reject(e)
    }
  })
}

let downloading
let onProgressCb
let onFinishCb
let downloadingPromiseGlobal
let onErrorCb

async function downloadNode(onProgress, onFinish, onError, nodeMode) {
  if (downloading) {
    logger.info('TRYING TO DOWNLOAD NODE WHILE DOWNLOADING')
    onProgressCb = onProgress
    onFinishCb = onFinish
    onErrorCb = onError
    return downloadingPromiseGlobal
  }
  let node = nodeMode
  if (!nodeMode) {
    node = globalNodeMode
  }
  changeNodeMode(+node)
  downloadingPromiseGlobal = new Promise(async (resolve, reject) => {
    downloading = true
    onProgressCb = onProgress
    onFinishCb = onFinish
    onErrorCb = onError
    logger.info('DOWNLOADING THE NODE')
    try {
      const url = await getReleaseUrl(node)
      const version = await getRemoteVersion()

      if (!fs.existsSync(nodeModeData)) {
        fs.mkdirSync(nodeModeData)
        if (!fs.existsSync(getNodeDir())) {
          fs.mkdirSync(getNodeDir())
        }
      }

      const writer = fs.createWriteStream(getTempNodeFile())
      writer.on('finish', () =>
        writer.close(() => {
          downloading = false
          onFinishCb(version)
          resolve(version)
        })
      )
      writer.on('error', err => {
        downloading = false
        onErrorCb()
        reject(err)
      })

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
        onProgressCb({...p, version})
      })

      response.data.pipe(str).pipe(writer)
    } catch (error) {
      downloading = false
      onErrorCb()
      return reject(error)
    }
  })
  return downloadingPromiseGlobal
}

function writeError(err) {
  try {
    fs.appendFileSync(
      getNodeErrorFile(),
      `====== NODE ERROR, TIME: ${new Date().toUTCString()}======\n${err}\n====== END OF ERROR ======\n\n`
    )
  } catch (e) {
    logger.error(`cannot write error to file: ${e.toString()}`)
  }
}

async function startNode(
  port,
  apiKey,
  logLevel,
  useLogging = true,
  onLog,
  onExit,
  nodeMode
) {
  changeNodeMode(+nodeMode)
  const parameters = ['--datadir', getNodeDataDir(), '--rpcport', port]
  // const version = await getCurrentVersion(false)
  parameters.push('--apikey')
  parameters.push(apiKey)
  parameters.push('--log')
  parameters.push(logLevel)
  const configFile = getNodeConfigFile()
  if (fs.existsSync(configFile)) {
    parameters.push('--config')
    parameters.push(configFile)
  }
  const nodeProcess = spawn(getNodeFile(), parameters, {
    cwd: getNodeDir(),
  })
  logger.info(
    'node starting, command: ',
    getNodeFile(),
    parameters,
    `. working directory: "${getNodeDir()}"`
  )

  nodeProcess.stdout.on('data', data => {
    const str = data.toString()
    if (onLog) onLog(str.split('\n').filter(x => x))
    if (useLogging) {
      logger.info(str)
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
  logger.info('RECEIVED: node stopping: ', node && node.pid)
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
          logger.info(`node ${node.pid} stopped successfully`)
          return resolve(`node ${node.pid} stopped successfully`)
        })
      } else {
        logger.info(`node ${node.pid} stopped successfully`)
        node.on('exit', () => resolve(`node ${node.pid} stopped successfully`))
        node.on('error', reject)
        node.kill()
      }
    } catch (e) {
      return reject(e)
    }
  })
}

function getCurrentVersion(tempNode, nodeMode) {
  let nodeM = nodeMode
  if (!nodeMode) {
    nodeM = globalNodeMode
  }
  logger.error('getCurrentVersion-nodeMode', nodeM)
  changeNodeMode(+nodeM)

  return new Promise((resolve, reject) => {
    const node = tempNode ? getTempNodeFile() : getNodeFile()
    try {
      const nodeVersion = spawn(node, ['--version'], {
        cwd: getNodeDir(),
      })
      nodeVersion.stderr.on('data', data => {
        if (data) {
          let dataString = data.toString()
          dataString = dataString.match(/\d+\.\d+\.\d+/g)
          if (!dataString) {
            return reject(
              new Error(`cannot resolve node version, stderr: null`)
            )
          }
          const {version} = semver.coerce(dataString[0])

          logger.info(`NODE VERSION ${version}`)

          return semver.valid(version)
            ? resolve(version)
            : reject(
                new Error(
                  `cannot resolve node version, stderr: ${dataString.toString()}`
                )
              )
        }
      })

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
    try {
      logger.info('updating node file')
      const currentNode = getNodeFile()
      const tempNode = getTempNodeFile()

      logger.info({currentNode, tempNode})
      let num = 5
      let done = false
      while (num > 0) {
        try {
          if (fs.existsSync(currentNode)) {
            rimraf.sync(currentNode)
          }
          done = true
        } catch (e) {
          await sleep(1000)
        } finally {
          num -= 1
        }
      }
      if (!done) {
        return reject(new Error('cannot remove old node executable file'))
      }

      fs.renameSync(tempNode, currentNode)
      if (process.platform !== 'win32') {
        fs.chmodSync(currentNode, '755')
      }
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

function nodeExists() {
  return fs.existsSync(getNodeFile())
}

function cleanNodeState() {
  const chainDbDirectory = getNodeDataDir()
  if (fs.existsSync(chainDbDirectory)) {
    rimraf.sync(chainDbDirectory)
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

function encrypt(plaintext, secret) {
  const nonce = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv('aes-256-gcm', secret, nonce)
  const ciphertext = Buffer.concat([
    cipher.update(plaintext, 'utf8'),
    cipher.final(),
  ])
  const tag = cipher.getAuthTag()
  return Buffer.concat([nonce, ciphertext, tag])
}

function checkConfigs(node) {
  changeNodeMode(+node.localNodeMode)
  if (node.localNodeMode === 1) {
    if (!fs.existsSync(getNodeConfigFile())) {
      console.info('no config.json file found, creating default config.json')
      fs.writeFileSync(
        getNodeConfigFile(),
        JSON.stringify(defaultConfigTestNet)
      )
    }
  }
  if (node.localNodeMode === 2) {
    if (!fs.existsSync(getNodeConfigFile())) {
      console.info('no config.json file found, creating default config.json')
      fs.writeFileSync(getNodeConfigFile(), JSON.stringify(defaultConfigDevNet))
    }
  }

  if (!fs.existsSync(getNodeConfigFile())) {
    console.info('no config.json file found, creating default config.json')
    fs.writeFileSync(getNodeConfigFile(), JSON.stringify(defaultConfigTestNet))
  }

  if (node.walletJson) {
    if (!fs.existsSync(node.walletJson)) {
      defaultWalletJson(node.walletPassword)
    } else {
      // eslint-disable-next-line global-require,import/no-dynamic-require
      const json = require(getNodeConfigFile())
      json.vault.path = node.walletJson
      json.vault.password = node.walletPassword

      fs.writeFileSync(getNodeConfigFile(), JSON.stringify(json))
    }
  } else {
    defaultWalletJson(node.walletPassword)
  }
}

function defaultWalletJson(password) {
  if (!fs.existsSync(getNodeWalletFile())) {
    logger.info('no wallet.json file found, generating default wallet.json')
    // TODO: prompt password
    const key = keccak(password)
    const wallet = {
      ecdsaPrivateKey: crypto.randomBytes(32).toString('hex'),
      tpkeKeys: {},
      thresholdSignatureKeys: {},
    }
    const encryptedWallet = encrypt(JSON.stringify(wallet), key)
    // eslint-disable-next-line global-require,import/no-dynamic-require
    const json = require(getNodeConfigFile())

    if (json.vault.path !== 'wallet.json') {
      json.vault.path = 'wallet.json'
      json.vault.password = password
      fs.writeFileSync(getNodeConfigFile(), JSON.stringify(json))
    }

    fs.writeFileSync(getNodeWalletFile(), encryptedWallet)
  } else {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    const json = require(getNodeConfigFile())
    if (json.vault.path !== 'wallet.json') {
      json.vault.path = 'wallet.json'
    }
    json.vault.password = password
    fs.writeFileSync(getNodeConfigFile(), JSON.stringify(json))
  }
}

module.exports = {
  checkConfigs,
  downloadNode,
  getCurrentVersion,
  getRemoteVersion,
  startNode,
  stopNode,
  updateNode,
  nodeExists,
  cleanNodeState,
  getLastLogs,
  purgeNode,
}
