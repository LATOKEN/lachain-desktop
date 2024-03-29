const events = require('events')
const semver = require('semver')
const {
  downloadNode,
  getRemoteVersion,
  nodeExists,
  getCurrentVersion,
} = require('./blockchain-node')
const {promiseTimeout} = require('./utils')

const checkingInterval = 30 * 60 * 1000

class NodeUpdater extends events.EventEmitter {
  constructor(logger, currentVersionUpdated) {
    super()

    this.logger = logger
    this.currentVersionUpdated = currentVersionUpdated
    this.timeout = 0
  }

  async checkForUpdates(currentVersion, isInternalNode, nodeMode) {
    this.logger.info(
      `start checking updates, internal node: ${isInternalNode}, current version: ${currentVersion}`
    )
    this.currentVersion = currentVersion
    this.isInternalNode = isInternalNode

    if (this.timeout) {
      clearTimeout(this.timeout)
    }

    return this.doUpdateCheck(nodeMode)
  }

  async doUpdateCheck(nodeMode) {
    try {
      const remoteVersion = await getRemoteVersion()
      if (this.isInternalNode && !nodeExists()) {
        this.logger.info('node does not exist, return')
        return false
      }

      this.logger.info('got remote version', remoteVersion)
      console.log('got remote version', remoteVersion)

      this.currentVersion = await getCurrentVersion(false, nodeMode)
      this.currentVersionUpdated(this.currentVersion)

      if (semver.lt(this.currentVersion, remoteVersion)) {
        this.logger.info('update available')
        this.emit('update-available', {version: remoteVersion})

        if (this.isInternalNode) {
          if (!this.downloadPromise) {
            promiseTimeout(5000, getCurrentVersion(true, nodeMode))
              .then(version => {
                this.logger.info('got local temp version', version)
                if (semver.lt(version, remoteVersion)) {
                  this.downloadNode(remoteVersion)
                } else {
                  this.emit('update-downloaded', {version})
                }
              })
              .catch(() => this.downloadNode(remoteVersion))
          } else {
            this.logger.info('download promise is not null, skip downloading')
          }
        }

        return true
      }
    } catch (e) {
      this.logger.error('error while checking update', e.toString())
    } finally {
      this.timeout = setTimeout(
        () => this.doUpdateCheck(nodeMode),
        checkingInterval
      )
    }

    return false
  }

  async downloadNode(remoteVersion) {
    this.logger.info(
      'start download',
      remoteVersion,
      'promise',
      !!this.downloadPromise
    )
    if (this.downloadPromise) return

    const onProgress = progress => {
      this.emit('download-progress', progress)
    }

    const onFinish = () => {
      this.emit('update-downloaded', {version: remoteVersion})
    }

    const onError = e => {
      this.logger.error('error while downloading update', e.toString())
      this.emit('update-failed')
    }

    this.downloadPromise = downloadNode(onProgress, onFinish, onError)
      .then()
      .finally(() => {
        this.downloadPromise = null
      })
  }
}

module.exports = NodeUpdater
