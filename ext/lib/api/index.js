const debug = require('debug')
const express = require('express')
const validate = require('lib/api-v2/validate')

const log = debug('democracyos:ext:api')

const app = module.exports = express()

const customSignin = process.env.CUSTOM_SIGNIN

if (customSignin) app.use('/ext/auth/miargentina', require('./miargentina'))
app.use('/ext/api/forum', require('./forum'))
app.use('/ext/api/filter', require('./filter'))
app.use('/ext/api/search', require('./search'))

app.use(function validationErrorHandler (err, req, res, next) {
  if (res.headersSent) return next(err)
  if (!(err instanceof validate.SchemaValidationError)) return next(err)

  res.json(400, {
    status: 400,
    error: {
      code: 'INVALID_REQUEST_PARAMS',
      message: err.message || 'Invalid request parameters.',
      info: err.errors
    }
  })
})

app.use(function apiError (err, req, res, next) {
  if (res.headersSent) return next(err)

  const status = err.status || 500
  const code = err.code || 'SERVER_ERROR'
  const message = err.message || 'Server Error.'

  const method = (req.method || 'GET').toUpperCase()

  if (status === 500) {
    log(`ERROR ${method} ${req.url}`, err)
  }

  res.status(200).json({
    status: status,
    error: {
      code: code,
      message: message
    }
  })
})
