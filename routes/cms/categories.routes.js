const express = require('express')
const {Cms} = require('../../controllers')

const router = express.Router()

router.route('/')
    .get(Cms.CategoryCtrl.index)
    .post(Cms.CategoryCtrl.store)

router.route('/:id')
    .get(Cms.CategoryCtrl.show)
    .put(Cms.CategoryCtrl.update)
    .patch(Cms.CategoryCtrl.update)
    .delete(Cms.CategoryCtrl.destroy)

module.exports = router