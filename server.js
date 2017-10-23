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
  database.raw('INSERT INTO foods (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?) RETURNING id, name, calories',
  [name, calories, new Date, new Date]
  )
  .then(function(data){
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
    response.status(204).json(data.rows[0])
  })
})

// DELETE specific food
app.delete('/api/v1/foods/:id', function(request, response, next) {
  let id = request.params.id

  database.raw('DELETE FROM foods WHERE id = ?', [id])
  .then(function(){
    response.status(204).json(id)
  })
})

// GET all meals
app.get('/api/v1/meals', function(request, response, next) {
  database.raw("select meals.*, json_agg(foods.*) AS foods from ((meals inner join meal_foods on meals.id = meal_foods.meal_id) inner join foods on meal_foods.food_id = foods.id) GROUP BY meals.id")
  .then(function(data){
  response.status(200).json(data.rows)
  })
})

//GET Specific meal
app.get('/api/v1/meals/:id/foods', function(request, response, next) {
  let id = request.params.id
  database.raw("select meals.*, json_agg(foods.*) AS foods from ((meals inner join meal_foods on meals.id = meal_foods.meal_id) inner join foods on meal_foods.food_id = foods.id) WHERE meals.id = ? GROUP BY meals.id",
  [id])
  .then(function(data){
    response.status(200).json(data.rows)
  })
})

// POST Food to Meal
app.post('/api/v1/meals/:meal_id/foods/:id', function(request, response, next) {
  let meal_id = request.params.meal_id
  let food_id = request.params.id
  database.raw('INSERT INTO meal_foods (meal_id, food_id) VALUES (?, ?) RETURNING id, meal_id, food_id',
  [meal_id, food_id])
  .then(function(data){
    console.log(data.rows);
    response.status(201).json(data.rows[0])
  })
})

// DELETE food from meal
app.delete('/api/v1/meals/:meal_id/foods/:id', function(request, response, next) {
  let meal_id = request.params.meal_id
  let food_id = request.params.id
  database.raw('DELETE FROM meal_foods where food_id = ? AND meal_id = ?',
  [food_id, meal_id])
  .then(function(){
    response.status(204).json(meal_id)
  })
})

if (!module.parent) {
  app.listen(process.env.PORT || 3000, function() {
    console.log(`${app.locals.title} is running on port 3000.`)
  })
}

module.exports = app;
