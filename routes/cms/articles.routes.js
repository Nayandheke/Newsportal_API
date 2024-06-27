const express = require('express')
const {Cms} = require('../../controllers')
const {uploadFile} = require('../../lib')

const router = express.Router()

const mimeList = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg']

router.route('/')
    .get(Cms.ArticleCtrl.index)
    .post(uploadFile(mimeList).array('images'),Cms.ArticleCtrl.store)

router.route('/:id')
    .get(Cms.ArticleCtrl.show)
    .put(uploadFile(mimeList).array('images'),Cms.ArticleCtrl.update)
    .patch(uploadFile(mimeList).array('images'),Cms.ArticleCtrl.update)
    .delete(Cms.ArticleCtrl.destroy)

module.exports = router