const Validator = require('../../middlewares/ValidateMiddleware')
const joi = require('joi')

joi.objectId = () => joi.string().hex().length(24)
joi.location = () => joi.array().items(joi.number().required())

module.exports = (router) => {
  /**
   * @api {post} /login 账号密码登陆
   * @apiName loginWithPassword
   * @apiGroup Account
   *
   * @apiDescription loginWithPassword
   *
   * @apiParam {String}  userName  用户名
   * @apiParam {String}  password  密码
   *
   */
  router.post('/login',
    Validator({
      header: joi.object().keys({
      }),
      body: joi.object().keys({
        userName: joi.string().required(),
        password: joi.string().required()
      })
    }), require('./login'))
}
