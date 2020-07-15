const jwt = require('jsonwebtoken')
const { handleErrorCustom } = require('../helpers/handlerError')

module.exports = (req, res, next) => {
  const token = req.header('token')
  if (!token) return handleErrorCustom(res, 400, 'Auth Error')
  try {
    const decoded = jwt.verify(token, 'string')
    req.user = decoded
    next()
  } catch(err) {
    handleErrorCustom(res, 400, 'invalid token')
  }
}