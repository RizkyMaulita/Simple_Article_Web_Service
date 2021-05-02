if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const http = require('http')
const app = require('./app.js')
const port = +process.env.PORT || 3000
const server = http.createServer(app)

server.listen(port, () => {
  console.log(`Connected on port `, port)
})