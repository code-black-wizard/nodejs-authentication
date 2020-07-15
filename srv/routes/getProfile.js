const { User } = require('../model')
const auth = require('../middleware/auth')

module.exports = (app) => {
  app.get('/profile', auth,
  async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id)
      res.status(200).json({
        id: user._id,
        username: user.username,
        email: user.email
      })
    } catch(err) {
      next(err)
    }
  })
}