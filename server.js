var express = require('express')
var app = express()

app.locals.secrets = {
  wowowow: "I am a banana"
}

app.set('port', process.env.PORT || 3000)
app.locals.title = "Quantified Self Express API"

app.get('/api/v1/foods', function(request, response) {
  response.send('Endpoint for api/v1/foods')
})

app.get('/api/v1/foods/:id', function(request, response) {
  var id = request.params.id
  var message = app.locals.secrets[id]

  if (!message) { return response.sendStatus(404) }

  response.json({ id, message })
})

if (!module.parent) {
  app.listen(3000, function() {
    console.log(`${app.locals.title} is running on port 3000.`)
  })
}

module.exports = app;
