import axios from 'axios'

const getSuggestions = text => {
  const query = {
    suggest: {
      germanSuggester: {
        prefix: text,
        completion: {
          field: 'german.auto',
          size: 5,
          fuzzy: {
            fuzziness: 'auto',
          },
        },
      },
      frenchSuggester: {
        prefix: text,
        completion: {
          field: 'french.auto',
          size: 5,
          fuzzy: {
            fuzziness: 'auto',
          },
        },
      },
    },
  }

  return axios({
    method: 'get',
    url: `https://first-cluster-2026533573.eu-central-1.bonsaisearch.net/termbank/fiche/_search`,
    auth: {
      username: 'sl729fctsq',
      password: 'tslh5y1zel',
    },
    params: {
      source: query,
    },
  })
}

export { getSuggestions }
