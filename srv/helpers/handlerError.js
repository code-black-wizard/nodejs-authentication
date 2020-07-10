const handleError = (err, res) => {
  const { statusCode, message } = err
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  })
}

const handleErrorCustom = (res, statusCode, message) => {
  res.status(statusCode).json({
    statusCode,
    message
  })
}

module.exports = {
  handleError,
  handleErrorCustom
}