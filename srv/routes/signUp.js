const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const { User } = require('../model')

module.exports = (app, handleErr) => {
  app.post('/sign-up', [
    check('username', 'Please Enter a Valid Username').not().isEmpty().trim(),
    check('email', 'Please enter a valid email').isEmail().not().isEmpty().trim(),
    check('password', 'Please enter a valid password').isLength({ min: 6 }).not().isEmpty().trim()
  ], async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (errors.isEmpty()) {
        const { username, email, password } = req.body
        let user = await User.findOne({
          email
        })
        if (user) {
          handleErr(res, 400, 'User Already Exists')
        } else {
          user = new User({
            username,
            email,
            password
          })
          const salt = await bcrypt.genSalt(10)
          user.password = await bcrypt.hash(password, salt)
          await user.save()
          jwt.sign(
            {
              id: user.id
            },
            'string',
            {
              expiresIn: 1000
            },
            (err, token) => {
              if (err) throw err
              res.status(200).json({
                message: 'Your create profile',
                token
              })
            }
          )
        }
      } else {
        handleErr(res, 400, errors.array().map(err => `${err.param}: ${err.msg}`).join(', '))
      }
    } catch (err) {
      next(err)
    }
  })
}