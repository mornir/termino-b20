const env = require('node-env-file')
const es = require('./elasticsearch')

const INDEX_NAME = 'termbank'
const INDEX_TYPE = 'fiche'

function indexExists() {
  return es.indices.exists({
    index: INDEX_NAME,
  })
}

function createIndex() {
  return es.indices.create({
    index: INDEX_NAME,
  })
}

function deleteIndex() {
  return es.indices.delete({
    index: INDEX_NAME,
  })
}

function indexMapping() {
  return es.indices.putMapping({
    index: INDEX_NAME,
    type: INDEX_TYPE,
    body: {
      properties: {
        german: {
          type: 'completion',
          analyzer: 'simple',
          search_analyzer: 'simple',
        },
        french: {
          type: 'completion',
          analyzer: 'simple',
          search_analyzer: 'simple',
        },
      },
    },
  })
}

async function loadData() {
  try {
    await createIndex()
    await indexMapping()
  } catch (e) {
    console.log(e)
  }
}

async function deleteData() {
  try {
    if (!await indexExists()) {
      throw new Error('Nothing to delete')
    } else {
      deleteIndex()
    }
  } catch (e) {
    console.log(e)
  }
}

if (process.argv.includes('--delete')) {
  deleteData()
  console.log('deleting! ❌❌❌❌')
} else {
  loadData()
}
