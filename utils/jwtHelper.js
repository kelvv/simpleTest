const config = require('config')
const jwt = require('jsonwebtoken')

module.exports = {
  getToken: (user) => {
    let tokenSecret = config.get('TOKEN.SECRET')
    let tokenExp = config.get('TOKEN.EXP')
    delete user.jwt
    let token = jwt.sign({
      data: user
    }, tokenSecret, { expiresIn: tokenExp })
    return token
  }
}
