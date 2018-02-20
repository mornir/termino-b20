const express = require('express')
const router = express.Router()
const terminoController = require('./controllers/terminoController')

router.post('/register', (req, res) => {
  res.json({
    message: `Hello ${req.body.email}! Your user was registered!`,
  })
})

router.get('/test', (req, res) => {
  res.json({ test: 'hello' })
})

/* router.get('/suggest/:text/:size') */
router.get('/all', terminoController.getAllTerms)
router.get('/fuzzy/:text/:size', terminoController.getSuggestions)

module.exports = router
