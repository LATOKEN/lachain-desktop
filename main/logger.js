const {platform, getSystemVersion} = require('process')
const path = require('path')
const pino = require('pino')
const pinoms = require('pino-multi-stream')

const appDataPath = require('./app-data-path')

const opts = {
  level: process.env.LOG_LEVEL || 'debug',
  base: {pid: process.pid, os: `${platform} ${getSystemVersion()}`},
  redact: [
    'hex',
    'data[*].hex',
    'flips[*].hex',
    'flips[*].publicHex',
    'flips[*].privateHex',
    'flips[*].pics',
    'flips[*].urls',
    'context.shortFlips[*].hex',
    'context.longFlips[*].hex',
    'context.shortFlips[*].publicHex',
    'context.longFlips[*].publicHex',
    'context.shortFlips[*].privateHex',
    'context.longFlips[*].privateHex',
    'context.shortFlips[*].images',
    'context.longFlips[*].images',
    'context.longFlips[*].images',
    'internalApiKey',
    'externalApiKey',
  ],
  timestamp: () => `,"time":"${new Date().toISOString()}"`,
}
const fileStream = Object.assign(
  {stream: pino.destination(path.join(appDataPath('logs'), 'lachain.log'))},
  opts
)
const stdoutStream = Object.assign({stream: pino.destination(1)}, opts)
const streams = [fileStream, stdoutStream]

const logger = pinoms({streams})

module.exports = logger
