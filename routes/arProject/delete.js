const db = require('../../runtime/db')
const logger = require('../../runtime/log').get('community')
const Exception = require('../../libs/exception')
const co = require('co')

module.exports = (req, res, next) => {
  co(function * () {
    const _id = req.params._id
    const project = yield db.ARProject.findOne({ _id, isDeleted: false })
    if (!project) throw new Exception(404, `Cannot find project by id: ${_id}`)

    yield project.update({isDeleted: true})
    res.apiSuccess('Success to delete.')
  }).then(() => {
    next()
  }, (err) => {
    logger.error(err)
    res.apiError(err)
  })
}
