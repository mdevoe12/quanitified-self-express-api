const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database = require('knex')(configuration)

function all() {
  return database.raw('SELECT * FROM foods')
}

function find(id) {
  return database.raw("SELECT * FROM foods WHERE id=?", [id])
}

function destroyAll() {
  return database.raw('TRUNCATE foods RESTART IDENTITY CASCADE')
}

function create(name, calories) {
  return database.raw('INSERT INTO foods (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?) RETURNING id, name, calories',
  [name, calories, new Date, new Date])
}

module.exports = {destroyAll, all, create, find};
