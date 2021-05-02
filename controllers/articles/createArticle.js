const { Article } = require('../../models')
const { redis, patternKeyArticle } = require('../../config/redis')

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
        await redis.set(`${patternKeyArticle}_${createArticle.id}`, JSON.stringify(createArticle))
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