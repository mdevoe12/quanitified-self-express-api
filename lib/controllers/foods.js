const Food = require('../models/food');

function index(request, response, next) {
  Food.all()
  .then(function(data){
    if (data.rowCount == 0) { return response.sendStatus(404) }
    response.json(data.rows)
  })
}

function show(request, response, next) {
  let id = request.params.id
  Food.find(id)
  .then(function(data){
    if (data.rowCount == 0) { return response.sendStatus(404) }

    response.json(data.rows[0])
  })
}

module.exports = {index, show};
