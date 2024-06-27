const express = require('express')
const {Front} = require('../../controllers')
const router = express.Router()

router.get('/article/latest',Front.ArticleCtrl.latest) 
router.get('/article/featured',Front.ArticleCtrl.featured) 
router.get('/article/search',Front.ArticleCtrl.search) 
router.get('/article/:id', Front.ArticleCtrl.byId )
router.get('/article/:id/similar', Front.ArticleCtrl.similar )
router.get('/categories/:id/articles', Front.ArticleCtrl.byCategoryId )
module.exports = router