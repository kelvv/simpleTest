const db = require('../../runtime/db')
const logger = require('../../runtime/log').get('community')
const Exception = require('../../libs/exception')
const co = require('co')

module.exports = (req, res, next) => {
  co(function * () {
    const _id = req.params._id
    const payload = req.body
    const project = yield db.ARProject.findOneAndUpdate(
      { _id, isDeleted: false },
      {'$set': payload}, {new: true}
    )
    if (!project) throw new Exception(404, `Cannot find project by id: ${_id}`)
    res.apiSuccess(project)
  }).then(() => {
    next()
  }, (err) => {
    logger.error(err)
    res.apiError(err)
  })
}
