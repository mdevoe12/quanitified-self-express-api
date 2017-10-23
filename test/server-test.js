const assert = require('chai').assert;
const app = require('../server');
const request = require('request');
const Food = require('../lib/models/food');
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

describe('Server', function() {

  before(function(done) {
    this.port = 9876;

    this.server = app.listen(this.port, function(err, result) {
      if (err) { return done(err); }
      done();
    });

    this.request = request.defaults({
      baseUrl: 'http://localhost:9876/'
    });
  });

  after(function() {
    this.server.close();
  });

  it('should exist', function() {
    assert(app);
  })

  describe('GET /api/v1/foods', function() {
    beforeEach(function(done) {
      database.raw('INSERT INTO foods (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?) RETURNING id, name, calories',
      ['Banana', 200, new Date, new Date]
    ).then(function() { done() })
    })

    afterEach(function(done) {
      Food.destroyAll()
      .then(function() { done() })
    })

    it('should return all foods', function(done) {
      this.request.get('/api/v1/foods', function(error, response) {
        if (error) { done(error) }

        let name = 'Banana'
        let calories = 200

        let foods = JSON.parse(response.body)
        assert.equal(foods.length, 1)
        assert.equal(foods[0].name, 'Banana')
        assert.equal(foods[0].calories, 200)
        done()
      })
    })
  })


  describe('GET /api/v1/foods/:id', function() {

    it('should return a 404 if the resource is not found', function(done) {
      this.request.get('/api/v1/foods/100000', function(error, response) {
        if (error) { done(error) }
        assert.equal(response.statusCode, 404)
        done()
      })
    })
  })

  describe('POST /api/v1/foods', function() {
    beforeEach(function() {
      app.locals.secrets = {}
    })
    it('should not return 404', function(done) {
      this.request.post('/api/v1/foods', function(error, response) {
        if(error) { done(error) }
        assert.notEqual(response.statusCode, 404)
        done()
      })
    })
  })
})
