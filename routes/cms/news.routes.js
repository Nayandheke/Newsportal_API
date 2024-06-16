const express = require('express')
const {Cms} = require('../../controllers')
const {uploadFile} = require('../../lib')

const router = express.Router()

const mimeList = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg']

router.route('/')
    .get(Cms.NewsCtrl.index)
    .post(uploadFile(mimeList).array('images'),Cms.NewsCtrl.store)

router.route('/:id')
    .get(Cms.NewsCtrl.show)
    .put(uploadFile(mimeList).array('images'),Cms.NewsCtrl.update)
    .patch(uploadFile(mimeList).array('images'),Cms.NewsCtrl.update)
    .delete(Cms.NewsCtrl.destroy)

module.exports = router