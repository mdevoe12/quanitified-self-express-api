var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

app.set('port', process.env.PORT || 3000)
app.locals.title = "Quantified Self Express API"

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, PATCH, GET, DELETE, OPTIONS")
  next();
});


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// GET Foods
app.get('/api/v1/foods', function(request, response, next) {
  database.raw('SELECT * FROM foods')
  .then(function(data){
    if (data.rowCount == 0) { return response.sendStatus(404) }
    response.json(data.rows)
  })
})

// GET specific food by id
app.get('/api/v1/foods/:id', function(request, response, next) {
  let id = request.params.id
  database.raw("SELECT * FROM foods WHERE id=?", [id])
  .then(function(data){
    if (data.rowCount == 0) { return response.sendStatus(404) }

    response.json(data.rows[0])
  })
})

// POST new food
app.post('/api/v1/foods', function(request, response, next) {
  let name = request.body['food']['name']
  let calories = request.body['food']['calories']
  database.raw('INSERT INTO foods (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?)',
  [name, calories, new Date, new Date]
  )
  .then(function(data){
    console.log(data)
    response.status(201).json(data.rows[0])
  })
})

// PATCH for food with id
app.patch('/api/v1/foods/:id', function(request, response, next) {
  let id = request.params.id
  let name = request.body['food']['name']
  let calories = request.body['food']['calories']

  database.raw('UPDATE foods SET name = ?, calories = ?, updated_at = ? WHERE id = ?',
  [name, calories, new Date, id]
)
  .then(function(data){
    response.json(data.rows[0])
  })
})

// DELETE specific food
app.delete('/api/v1/foods/:id', function(request, response, next) {
  let id = request.params.id

  database.raw('DELETE FROM foods WHERE id = ?', [id])
  .then(function(){
    response.status(200)
  })
})

if (!module.parent) {
  app.listen(3000, function() {
    console.log(`${app.locals.title} is running on port 3000.`)
  })
}

module.exports = app;
