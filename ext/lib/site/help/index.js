var express = require('express')
var app = module.exports = express()
var visibility = require('lib/visibility')

app.get('/ayuda', visibility, require('lib/site/layout'))
app.get('/ayuda/*', visibility, require('lib/site/layout'))
