const fs = require('fs')
const path = require('path')
const config = require('config')
let logPath = path.join(__dirname, '/../log')
if (!fs.existsSync(logPath)) {
  fs.mkdirSync(logPath)
}

const log4js = require('log4js')
log4js.layouts.addLayout('json', function (config) {
  return function (logEvent) { return JSON.stringify(logEvent) + config.separator }
})
log4js.configure(config.get('log'))

module.exports = {
  get: name => {
    let logger = log4js.getLogger(name)
    logger.setLevel('INFO')
    if (process.env.NODE_ENV === 'development') logger.setLevel('TRACE')
    return logger
  }
}
