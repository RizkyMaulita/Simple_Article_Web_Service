const env = process.env.NODE_ENV || 'development';
const uppercasedEnv = env.toUpperCase();

if (env === 'development' || env === 'test') require('dotenv').config();

const username = process.env['DB_USERNAME_' + uppercasedEnv] ? process.env['DB_USERNAME_' + uppercasedEnv] : 'postgres'
const password = process.env['DB_PASSWORD_' + uppercasedEnv] ? process.env['DB_PASSWORD_' + uppercasedEnv] : 'postgres'
const database = process.env['DB_NAME_' + uppercasedEnv] ? process.env['DB_NAME_' + uppercasedEnv] : 'articles_production'
const host = process.env['DB_HOST_' + uppercasedEnv] ? process.env['DB_HOST_' + uppercasedEnv] : 'postgres'
const dialect = process.env['DB_DIALECT_' + uppercasedEnv] ? process.env['DB_DIALECT_' + uppercasedEnv] : 'postgres'

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
