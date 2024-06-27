const express = require('express')
const editorsRoutes = require('./editor.routes')
const categoriesRoutes = require('./categories.routes')
const articleRoutes = require('./articles.routes')
const { adminUser } = require('../../lib')

const router = express.Router()

router.use('/editor', adminUser, editorsRoutes)
router.use('/categories',  categoriesRoutes)
router.use('/articles',  articleRoutes)

module.exports = router