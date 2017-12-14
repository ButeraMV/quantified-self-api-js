var assert = require('chai').assert
var app = require('../server')
var request = require('request')
var environment = process.env.NODE_ENV || 'test'
var configuration = require('../knexfile')[environment]
var database = require('knex')(configuration)
var Meal = require('../lib/models/meal')

describe('Server', function() {
  before(function(done) {
    this.port = 9876
    this.server = app.listen(this.port, function(err, result) {
      if(err) { return done(err) }
      done()
    })
    this.request = request.defaults({
      baseUrl: 'http://localhost:9876'
    })
  })
  after(function() {
    this.server.close()
  })

  it('should exist', function() {
    assert(app)
  })

  describe('GET /', function() {
    it('should return a 200', function(done) {
      this.request.get('/', function(error, response) {
        if (error) { done(error) }
        assert.equal(response.statusCode, 200)
        done()
      })
    })
  })

  describe('GET /api/v1/meals', function() {
    beforeEach((done) => {
      Meal.create("Breakfast")
      .then(() => done())
    })

    afterEach((done) => {
      Meal.destroyAll()
      .then(() => done())
    })

    it('should return the ids and meal names', function(done) {
      this.request.get('api/v1/meals', function(error, response) {
        if (error) { done(error) }

        const id = 1
        const meal = "Breakfast"

        let parsedMeal = JSON.parse(response.body)

        assert.equal(parsedMeal.id, id)
        assert.equal(parsedMeal.name, meal)
        assert.ok(parsedMeal.created_at)
      })
    })
  })

})
