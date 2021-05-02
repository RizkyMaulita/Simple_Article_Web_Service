const router = require('express').Router()
const { ArticleController } = require('../controllers')

router.post('/', ArticleController.createArticle)
router.get('/', ArticleController.getDetailArticle)

module.exports = router