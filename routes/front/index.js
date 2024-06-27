const express = require('express')
const articleRoutes = require('./article.routes')
const listRoutes = require('./list.routes')

const router = express.Router()

router.use( articleRoutes)

router.use( listRoutes)

module.exports = router