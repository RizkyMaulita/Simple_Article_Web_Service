const Redis = require('ioredis')
const redis = new Redis()

module.exports = {
  redis,
  patternKeyArticle: `${process.env.NODE_ENV}_${process.env.ARTICLE_KEY_REDIS}`
}