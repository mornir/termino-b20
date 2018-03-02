const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

//const logger = require('./src/config/logdna')
const routes = require('./src/routes')

// create Express app
const app = express()

app.use(morgan('combined'))

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json())

//TODO: Restric origin
app.use(cors())

// Handle routes
app.use('/', routes)

module.exports = app
