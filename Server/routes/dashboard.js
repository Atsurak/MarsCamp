const express = require('express')
const router = express.Router()
const auth = require('../scripts/auth-checks')

router.get('/', auth.checkAuth, (req, res) => {
    res.render('dashboard')
})

module.exports = router