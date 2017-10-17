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
  });

  after(function() {
    this.server.close();
  });

  it('should exist', function() {
    assert(app);
  })

  describe('GET /api/v1/foods', function() {
    it('should return a 200', function(done) {
      request.get('http://localhost:9876', function(error, response) {
        if (error) { done(error); }
        assert.equal(response.statusCode, 200);
        done();
      })
    })
  })
})
