const jwt = require('jsonwebtoken')
const config = require('config')

function AuthorizationMiddleware (req, res, next) {
  let tokenSecret = config.get('TOKEN.SECRET')
  let tokenString = req.headers['x-authorization-token']
  if (tokenString != null) {
    try {
      jwt.verify(tokenString, tokenSecret)
      let token = jwt.decode(tokenString, tokenSecret)
      req.user = token.data
    } catch (err) {
      res.apiError(err)
    }
  }
  next()
}

module.exports = AuthorizationMiddleware
