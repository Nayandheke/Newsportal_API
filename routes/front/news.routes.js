const express = require('express')
const {Front} = require('../../controllers')
const router = express.Router()

router.get('/news/latest',Front.NewsCtrl.latest) 
router.get('/news/featured',Front.NewsCtrl.featured) 
// router.get('/news/:id', Front.NewsCtrl.byId )
module.exports = router