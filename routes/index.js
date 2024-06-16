const express = require('express')
const authRoutes = require('./auth')
const cmsRoutes = require('./cms')
const { auth, cmsUser } = require('../lib')

const router = express.Router()

router.use(authRoutes)
router.use('/cms', auth, cmsUser, cmsRoutes)

router.use((req, res, next) => {
    next({
        message: 'Resource not found.',
        status:404
    })
})

module.exports = router