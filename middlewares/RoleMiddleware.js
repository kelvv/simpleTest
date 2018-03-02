const Exception = require('../libs/exception')

module.exports = function GetMiddleware (roleList) {
  return (req, res, next) => {
    if (roleList.indexOf(req.user.role) < 0) {
      return res.apiError(new Exception(2001))
    }
    next()
  }
}
