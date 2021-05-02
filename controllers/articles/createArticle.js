const { Article } = require('../../models')
const Redis = require('ioredis')
const redis = new Redis()

module.exports = async (req, res, next) => {
  try {
    const { author, title, body } = req.body
    if (!author || !title || !body) {
      throw {
        status: 400,
        message: `Request body must be include 'author', 'title', and 'body' !`
      }
    } else {
      const payload = {
        author,
        title,
        body
      }
      const createArticle = await Article.create(payload)
      if (createArticle) {
        await redis.set(`${process.env.NODE_ENV}_${process.env.ARTICLE_KEY_REDIS}_${createArticle.id}`, JSON.stringify(createArticle))
        res.status(201).json({
          message: `Successfully create new article !`,
          data: createArticle
        })
      } else throw {
        status: 400,
        message: `Failed to create new article !`
      }
    }
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      next({
        name: 'Validation Error',
        status: 400,
        message: err.errors
      })
    } else next (err)
  }
}