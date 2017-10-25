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
      Promise.all([
        Food.create('Banana', 200),
        Food.create('Honey', 300)
      ])
      .then(function() { done() })
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
        assert.equal(foods.length, 2)
        assert.equal(foods[0].name, 'Banana')
        assert.equal(foods[0].calories, 200)
        done()
      })
    })
  })


  describe('GET /api/v1/foods/:id', function() {
    beforeEach(function(done) {
      Food.create('Banana', 200)
      .then(function() {return Food.create('Honey', 300)})
      .then(function() { done() })
    })

    afterEach(function(done) {
      Food.destroyAll()
      .then(function() { done() })
    })

    it('should return a 404 if the resource is not found', function(done) {
      this.request.get('/api/v1/foods/100000', function(error, response) {
        if (error) { done(error) }
        assert.equal(response.statusCode, 404)
        done()
      })
    })

    it('returns a specific food', function(done) {
      this.request.get('/api/v1/foods/1', function(error, response) {
        if (error) { done(error) }

        let food = JSON.parse(response.body)

        assert.equal(food.id, 1)
        assert.equal(food.name, 'Banana')
        assert.equal(food.calories, 200)
        done()
      })
    })

    it('returns another specific food', function(done) {
      this.request.get('/api/v1/foods/2', function(error, response) {
        if (error) { done(error) }

        let food = JSON.parse(response.body)

        assert.equal(food.id, 2)
        assert.equal(food.name, 'Honey')
        assert.equal(food.calories, 300)
        done()
      })
    })
  })

  describe('POST /api/v1/foods', function() {
    afterEach(function(done) {
      Food.destroyAll()
      .then(function() { done() })
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
