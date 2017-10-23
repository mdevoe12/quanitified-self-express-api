const Food = require('../models/food');

function index(request, response, next) {
  Food.all()
  .then(function(data){
    if (data.rowCount == 0) { return response.sendStatus(404) }
    response.json(data.rows)
  })
}

module.exports = {index};
