const express = require('express')
const router = express.Router()


// @desc Login/Landiing page
// @route GET /


router.get('/', (req, res) => {
    res.render('login', {layout: 'login'})
})


// @desc Dshboard 
// @route GET /dashboard

router.get('/dashboard', (req, res) => {
    res.render('dashboard')
})

module.exports = router