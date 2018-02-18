const logger = require('../config/logdna')
const es = require('../config/elasticsearch')

const INDEX_NAME = 'termbank'
const INDEX_TYPE = 'fiche'

exports.getSuggestions = async (req, res, next) => {
  const { text, size } = req.params
  es
    .search({
      index: INDEX_NAME,
      type: INDEX_TYPE,
      body: {
        suggest: {
          firstNameSuggester: {
            prefix: text,
            completion: {
              field: 'firstName',
              size: size,
              fuzzy: {
                fuzziness: 'auto',
              },
            },
          },
          lastNameSuggester: {
            prefix: text,
            completion: {
              field: 'lastName',
              size: size,
              fuzzy: {
                fuzziness: 'auto',
              },
            },
          },
        },
      },
    })
    .then(
      resp => {
        const hits = resp.hits.hits
        res.json(hits)
      },
      function(err) {
        console.trace(err.message)
      }
    )

  logger.logger.log('Suggest players with first name or last name: ' + text)

  return res.json(result)
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
    .then(
      resp => {
        const hits = resp.hits.hits
        res.json(hits)
      },
      function(err) {
        console.trace(err.message)
      }
    )
}
