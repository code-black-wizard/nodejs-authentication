const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const { signUp, signIn, getProfile } = require('./router')
const { handleError, handleErrorCustom } = require('./helpers/handlerError')

mongoose.connect('mongodb://localhost:27017/nodejs-authorization', { useNewUrlParser: true })
  .then(() => {
    app.use(cors())
    app.use(express.json())
    signUp(app, handleErrorCustom)
    signIn(app, handleErrorCustom)
    getProfile(app)
    app.use((err, req, res, next) => {
      handleError(err, res)
    })
    app.listen(3000, () => {
      console.log('Example app listening on port 3000!')
    })
  })
  .catch(err => {
    throw err
  })
