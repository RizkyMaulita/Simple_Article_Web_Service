const Redis = require('ioredis')
const redis = new Redis({
  port: 6379,
  host: process.env.REDIS_HOST
})

module.exports = {
  redis,
  patternKeyArticle: `${process.env.NODE_ENV}_${process.env.ARTICLE_KEY_REDIS}`
}