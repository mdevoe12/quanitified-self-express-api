var express = require('express')
var app = express()

app.get('/api/v1/foods', function(request, response) {
  response.send('Endpoint for api/v1/foods')
})

app.listen(3000)
