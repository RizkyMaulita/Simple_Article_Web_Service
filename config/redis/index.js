const Redis = require('ioredis')
// const redis = new Redis(6379, process.env.REDIS_HOST)
const redis = new Redis({
  port: 6380,
  host: process.env.REDIS_HOST
})
console.log(process.env.REDIS_HOST)
module.exports = {
  redis,
  patternKeyArticle: `${process.env.NODE_ENV}_${process.env.ARTICLE_KEY_REDIS}`
}