const { Article } = require('../../models')
const { redis, patternKeyArticle } = require('../../config/redis')
const { sortData } = require('../../helpers')

module.exports = async (req, res, next) => {
  try {
    const { query, author } = req.query
    const findKeyCaches = await redis.keys(`${patternKeyArticle}*`)
    if (findKeyCaches && findKeyCaches.length) {
      const arrPromises = []
      findKeyCaches.forEach(key => {
        arrPromises.push(redis.get(key))
      })
      const findCaches = await Promise.all(arrPromises)
      if (findCaches) {
        const data = findCaches.map(cache => JSON.parse(cache))
        const sortingData = sortData(data, 'id', 'DESC')
        if (query || author) {
          let searchByKeyword = []
          if (query) {
            const queryRegex = new RegExp(query, 'i')
            sortingData.forEach(article => {
              if (queryRegex.test(article.title) || queryRegex.test(article.body)) {
                searchByKeyword.push(article)
              }
            })
          } else {
            searchByKeyword = sortingData
          }
          let searchByAuthor = []
          if (author) {
            const authorRegex = new RegExp(author, 'i')
            searchByAuthor = searchByKeyword.filter(article => authorRegex.test(article.author))
          } else {
            searchByAuthor = searchByKeyword
          }
          if (searchByAuthor.length) {
            res.status(200).json(searchByAuthor)
          } else throw {
            status: 404,
            message: `Data Not Found !`
          }
        } else {
          res.status(200).json(sortingData)
        }
      } 
    } else {
      const findData = await Article.findAll({
        order: [['id', 'DESC']]
      })
      if (findData && findData.length) {
        const arrPromises = []
        findData.forEach(article => {
          redis.set(`${patternKeyArticle}_${article.id}`, JSON.stringify(article))
        })
        await Promise.all(arrPromises)
        if ( query || author ) {
          let searchByKeyword = []
          if (query) {
            const queryRegex = new RegExp(query, 'i')
            findData.forEach(article => {
              if (queryRegex.test(article.title) || queryRegex.test(article.body)) {
                searchByKeyword.push(article)
              }
            })
          } else {
            searchByKeyword = findData
          }
          let searchByAuthor = []
          if (author) {
            const authorRegex = new RegExp(author, 'i')
            searchByAuthor = searchByKeyword.filter(article => authorRegex.test(article.author))
          } else {
            searchByAuthor = searchByKeyword
          }
          if (searchByAuthor.length) {
            res.status(200).json(searchByAuthor)
          } else throw {
            status: 404,
            message: `Data Not Found !`
          }
        } else {
          res.status(200).json(findData)
        }
      } else throw {
        status: 404,
        message: `Data Not Found !`
      }
    }
  } catch (err) {
    next(err)
  }
}