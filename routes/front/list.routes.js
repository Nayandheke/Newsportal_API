const express = require('express')
const { Front } = require('../../controllers')

const router = express.Router()

router.get('/categories', Front.ListCtrl.categories )

module.exports = router