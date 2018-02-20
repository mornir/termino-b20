const logger = require('../config/logdna')
const es = require('../config/elasticsearch')

const INDEX_NAME = 'termbank'
const INDEX_TYPE = 'fiche'

exports.getSuggestions = async (req, res, next) => {
  console.log(req.params)
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
      // parse the answer into a single liste array of terms before returning to the client
      /*       const frenchSuggestions = response.suggest.frenchSuggester[0].options
      const germanSuggestions = response.suggest.germanSuggester[0].options
      const frenchTerms = frenchSuggestions.map(suggestion => ({
        id: suggestion._id,
        text: suggestion.text,
      }))
      const germanTerms = germanSuggestions.map(suggestion => {
        suggestion.text
      })
      res.json([...frenchTerms, ...germanTerms]) */

      const frenchSuggestions = response.suggest.frenchSuggester[0].options
      const germanSuggestions = response.suggest.germanSuggester[0].options
      res.json([...frenchSuggestions, ...germanSuggestions])
    })
    .catch(e => {
      console.log("une erreur s'est produite:")
    })

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
