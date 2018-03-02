const Validator = require('../../middlewares/ValidateMiddleware')
const Authorization = require('../../middlewares/AuthorizationMiddleware')
const Role = require('../../middlewares/RoleMiddleware.js')
const joi = require('joi')

joi.objectId = () => joi.string().hex().length(24)
joi.location = () => joi.array().items(joi.number().required())

module.exports = (router) => {
/**
 * @api {post} /arProject 创建AR项目
 * @apiName PostARProject
 * @apiGroup ARProject
 *
 * @apiDescription post arProject
 * @apiPermission admin
 *
 * @apiParam {String}  name  ar项目名称
 * @apiParam {Array}  location  地理位置
 * @apiParam {Array}  tags  标签
 *
 */
  router.post('/arProject',
    Validator({
      header: joi.object().keys({
        'x-authorization-token': joi.string().required()
      }),
      body: joi.object().keys({
        name: joi.string().required(),
        location: joi.location().required(),
        tags: joi.array().items(joi.string()).required()
      })
    }), Authorization, Role(['admin']), require('./post'))

/**
 * @api {delete} /arProject/:_id 删除AR项目
 * @apiName DeleteARProject
 * @apiGroup ARProject
 * @apiPermission admin
 *
 * @apiDescription delete arProject
 *
 * @apiParam {String}  _id  某ar项目的id
 *
 */
  router.delete('/arProject/:_id',
    Validator({
      header: joi.object().keys({
        'x-authorization-token': joi.string().required()
      }),
      params: joi.object().keys({
        _id: joi.string().required()
      })
    }), Authorization, Role(['admin']), require('./delete'))

/**
 * @api {put} /arProject/:_id 修改AR项目
 * @apiName PutARProject
 * @apiGroup ARProject
 * @apiPermission admin
 *
 * @apiDescription put arProject
 *
 * @apiParam {String}  _id  某ar项目的id
 *
 */
  router.put('/arProject/:_id',
    Validator({
      header: joi.object().keys({
        'x-authorization-token': joi.string().required()
      }),
      params: joi.object().keys({
        _id: joi.string().required()
      }),
      body: joi.object().keys({
        name: joi.string().optional(),
        location: joi.location().optional(),
        tags: joi.array().items(joi.string()).optional()
      })
    }), Authorization, Role(['admin']), require('./put'))

/**
 * @api {get} /arProject/:_id 获取arProject详情
 * @apiName GetARProjectDetail
 * @apiGroup ARProject
 *
 * @apiDescription get arProject detail
 *
 * @apiParam {String}  _id  某ar项目的id
 *
 */
  router.get('/arProject/:_id',
    Validator({
      header: joi.object().keys({

      }),
      params: joi.object().keys({
        _id: joi.string().required()
      })
    }), require('./get'))

/**
 * @api {get} /arProjects 获取arProject列表
 * @apiName GetARProjectList
 * @apiGroup ARProject
 *
 * @apiDescription get arProject list
 *
 * @apiParam {Number}  limit  返回数量
 * @apiParam {Number}  offset  跳过数量
 * @apiParam {Number}  sort  排序字段
 *
 */
  router.get('/arProjects',
    Validator({
      header: joi.object().keys({

      })
    }), require('./get'))
}
