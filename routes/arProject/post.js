const db = require('../../runtime/db')
const logger = require('../../runtime/log').get('test')

module.exports = async (req, res, next) => {
  try {
    req.body.configFileUrl = 'http://创建配置文件网络地址config.txt'
    const project = await db.ARProject.create(req.body)
    res.apiSuccess(project)
  } catch (error) {
    logger.error(`user - create: ${JSON.stringify(error.stack)}`)
    res.apiError(error)
  }
}
