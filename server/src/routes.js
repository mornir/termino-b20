const express = require('express')
const router = express.Router()
const terminoController = require('./controllers/terminoController')

router.get('/all', terminoController.getAllTerms)

router.get('/suggest/:text/:size', terminoController.getSuggestions)

router.get('/simple/:text/:size', terminoController.simpleSearch)

module.exports = router
