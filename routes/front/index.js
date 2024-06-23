const express = require('express')
const newsRoutes = require('./news.routes')
const listRoutes = require('./list.routes')

const router = express.Router()

router.use( newsRoutes)

router.use( listRoutes)

module.exports = router