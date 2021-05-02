const mainRouter = require('express').Router()
const articleRouter = require('./articleRouter.js')

mainRouter.use('/articles', articleRouter)

module.exports = mainRouter