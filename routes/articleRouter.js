const router = require('express').Router()
const { ArticleController } = require('../controllers')

router.post('/', ArticleController.createArticle)

module.exports = router