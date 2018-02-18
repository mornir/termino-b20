const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const logger = require('./config/logdna')
const elasticsearch = require('./config/elasticsearch')
const routes = require('./routes')

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())

//TODO: check if it is secure
app.use(cors())

app.use('/', routes)

app.listen(process.env.PORT || 8081, function() {
  logger.logger.log('App is running')
})
