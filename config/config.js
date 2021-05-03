const env = process.env.NODE_ENV || 'development';
const uppercasedEnv = env.toUpperCase();

if (env === 'development' || env === 'test') require('dotenv').config();

const username = process.env.NODE_ENV ? process.env['DB_USERNAME_' + uppercasedEnv] : 'postgres'
const password = process.env.NODE_ENV ? process.env['DB_PASSWORD_' + uppercasedEnv] : 'postgres'
const database = process.env.NODE_ENV ? process.env['DB_NAME_' + uppercasedEnv] : 'article_staging'
const host = process.env.NODE_ENV ? process.env['DB_HOST_' + uppercasedEnv] : 'postgres'
const dialect = process.env.NODE_ENV ? process.env['DB_DIALECT_' + uppercasedEnv] : 'postgres'

module.exports = {
  "development": {
    username,
    password,
    database,
    host,
    dialect
  },
  "test": {
    username,
    password,
    database,
    host,
    dialect,
    logging: false
  },
  "production": {
    username,
    password,
    database,
    host,
    dialect
  }
}
