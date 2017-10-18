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


app.get('/api/v1/foods', function(request, response) {
  database.raw('SELECT * FROM foods')
  .then(function(data){
    if (data.rowCount == 0) { return response.sendStatus(404) }
    response.json(data.rows)
  })
})


app.get('/api/v1/foods/:id', function(request, response) {
  var id = request.params.id
  var message = app.locals.secrets[id]

  if (!message) { return response.sendStatus(404) }

  response.json({ id, message })
})

app.post('/api/secrets', function(request, response) {
  response.status(201).end()
})

if (!module.parent) {
  app.listen(3000, function() {
    console.log(`${app.locals.title} is running on port 3000.`)
  })
}

module.exports = app;
