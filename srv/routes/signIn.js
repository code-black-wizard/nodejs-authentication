const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const { User } = require('../model')

module.exports = (app, handleErr) => {
  app.post('/signin', [
    check('email', 'Please enter a valid email').isEmail().not().isEmpty().trim(),
    check('password', 'Please enter a valid password').isLength({ min: 6 }).not().isEmpty().trim()
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req)
      const { email, password } = req.body
      if (errors.isEmpty()) {
        let user = await User.findOne({
          email
        })
        if (!user) {
          handleErr(res, 400, 'User Not Exist')
        } else {
          const isMatch = await bcrypt.compare(password, user.password)
          if (!isMatch) {
            handleErr(res, 400, 'Incorrect Password')
          } else {
            jwt.sign(
              {
                id: user.id
              },
              'string',
              {
                expiresIn: '1h'
              },
              (err, token) => {
                if (err) throw err
                res.status(200).json({
                  token,
                  user: {
                    id: user.id,
                    username: user.username,
                    email: user.email
                  },
                  message: 'You are logged in'
                })
              }
            )
          }
        }
      } else {
        handleErr(res, 400, errors.array().map(err => `${err.param}: ${err.msg}`).join(', '))
      }
    } catch (err) {
      next(err)
    }
  })
}