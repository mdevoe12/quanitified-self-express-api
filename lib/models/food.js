const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database = require('knex')(configuration)

function all() {
  return database.raw('SELECT * FROM foods')
}

function destroyAll() {
  return database.raw('TRUNCATE foods RESTART IDENTITY CASCADE')
}
module.exports = {destroyAll, all};
