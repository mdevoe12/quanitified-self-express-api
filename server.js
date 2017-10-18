var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

app.set('port', process.env.PORT || 3000)
app.locals.title = "Quantified Self Express API"

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// GET Foods
app.get('/api/v1/foods', function(request, response) {
  database.raw('SELECT * FROM foods')
  .then(function(data){
    if (data.rowCount == 0) { return response.sendStatus(404) }
    response.json(data.rows)
  })
})

// GET specific food by id
app.get('/api/v1/foods/:id', function(request, response) {
  let id = request.params.id
  database.raw("SELECT * FROM foods WHERE id=?", [id])
  .then(function(data){
    if (data.rowCount == 0) { return response.sendStatus(404) }

    response.json(data.rows[0])
  })
})

// POST new food
app.post('/api/v1/foods', function(request, response) {
  let name = request.param('name')
  let calories = request.param('calories')

  database.raw('INSERT INTO foods (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?)',
  [name, calories, new Date, new Date]
  )
  .then(function(data){
    response.status(201).json(data.rows[0])
  })
})

if (!module.parent) {
  app.listen(3000, function() {
    console.log(`${app.locals.title} is running on port 3000.`)
  })
}

module.exports = app;
