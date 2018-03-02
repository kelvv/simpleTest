const db = require('../../runtime/db')
const co = require('co')
const queryBuilder = require('../../utils/queryBuilder')
const logger = require('../../runtime/log').get('community')

module.exports = (req, res, next) => {
  co(function * () {
    let queryCondition = {
      isDeleted: false
    }

    if ('_id' in req.params) {
      queryCondition._id = req.params._id
    }

    const query = db.ARProject.find(queryCondition)

    queryBuilder(query, req.query)

    let results = yield query.lean().exec()

    res.apiSuccess(results)
  }).then(() => {
    next()
  }, (err) => {
    logger.error(err)
    res.apiError(err)
  })
}
