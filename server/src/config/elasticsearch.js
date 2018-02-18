const env = require('node-env-file')
const elasticsearch = require('elasticsearch')

env('.env')

const es = elasticsearch.Client({
  host: process.env.BONSAI_URL,
  log: 'trace',
})

module.exports = es
