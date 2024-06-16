const express = require('express')
const {Cms} = require('../../controllers')

const router = express.Router()

router.route('/')
    .get(Cms.EditorCtrl.index)
    .post(Cms.EditorCtrl.store)

router.route('/:id')
    .get(Cms.EditorCtrl.show)
    .put(Cms.EditorCtrl.update)
    .patch(Cms.EditorCtrl.update)
    .delete(Cms.EditorCtrl.destroy)

module.exports = router