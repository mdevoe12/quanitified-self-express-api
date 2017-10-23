var assert = require('chai').assert;
var app = require('../server');
var request = require('request');

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
