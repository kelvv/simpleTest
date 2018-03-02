const db = require('../../runtime/db')
const logger = require('../../runtime/log').get('test')
const Exception = require('../../libs/exception')
const jwtHelper = require('../../utils/jwtHelper')

module.exports = async (req, res, next) => {
  try {
    let {userName, password} = req.body
    let user = await db.User.findOne({ userName, password }).lean()

    if (!user) {
      new Exception().throw('2002')
    }

    user.jwt = jwtHelper.getToken(user)
    await db.User.findOneAndUpdate(
      { _id: user.id },
      {
        jwt: user.jwt
      }, { new: true }
    )

    return res.apiSuccess(user)
  } catch (error) {
    logger.error(`login : ${JSON.stringify(error.stack)}`)
    res.apiError(error)
  }
}
