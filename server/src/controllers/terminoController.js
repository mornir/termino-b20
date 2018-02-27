const logger = require('../config/logdna')
const es = require('../config/elasticsearch')

const INDEX_NAME = 'termbank'
const INDEX_TYPE = 'fiche'

// weird: if I remove 'async', I get errors
exports.getSuggestions = (req, res, next) => {
  const { text, size } = req.params

  es
    .search({
      index: INDEX_NAME,
      type: INDEX_TYPE,
      body: {
        suggest: {
          germanSuggester: {
            prefix: text,
            completion: {
              field: 'german',
              size: size,
              fuzzy: {
                fuzziness: 'auto',
              },
            },
          },
          frenchSuggester: {
            prefix: text,
            completion: {
              field: 'french',
              size: size,
              fuzzy: {
                fuzziness: 'auto',
              },
            },
          },
        },
      },
    })
    .then(response => {
      const frenchSuggestions = response.suggest.frenchSuggester[0].options
      const germanSuggestions = response.suggest.germanSuggester[0].options
      // logger.logger.log('Suggest players with first name or last name: ' + text)
      res.json([...frenchSuggestions, ...germanSuggestions])
    })
    .catch(err => {
      console.log("une erreur s'est produite:", err)
    })
}

exports.getAllTerms = (req, res, next) => {
  es
    .search({
      index: INDEX_NAME,
      type: INDEX_TYPE,
      body: {
        query: {
          match_all: {},
        },
      },
    })
    .then(resp => {
      const hits = resp.hits.hits
      res.json(hits)
    })
    .catch(err => {
      console.trace(err.message)
    })
}

exports.simpleSearch = (req, res, next) => {}