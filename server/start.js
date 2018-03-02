require('dotenv').config({ path: 'variables.env' })
const elasticsearch = require('elasticsearch')

const es = elasticsearch.Client({
  host: process.env.BONSAI_URL,
  // TODO: Remove trace
  log: 'trace',
})

module.exports = es

const app = require('./app')

const server = app.listen(process.env.PORT || 8081, () => {
  console.log(`Express running → PORT ${server.address().port}`)
})
