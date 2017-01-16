const express = require('express')

const app = express()

module.exports = app

app.use(require('ext/lib/site/help'))
