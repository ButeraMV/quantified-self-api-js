const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database = require('knex')(configuration)
const Meal = require('../models/meal')

const getMeals = (request, response, next) => {
  Meal.index()
  .then(function(data) {
    data.rows.forEach(function(row) {
      if (row["foods"][0] == null) {
        row["foods"] = []
      }
    })
    response.json(data.rows)
  })
}

const getFoodsForMeal = (request, response, next) => {
  var id = request.params.meal_id
  Meal.show(id)
  .then(function(data) {
    if (data.rowCount == 0) { return response.sendStatus(404) }
    response.json(data.rows[0])
  })
}

const addFoodToMeal = (request, response, next) => {
  var meal_id = request.params.meal_id
  var food_id = request.params.id
  Meal.create(meal_id, food_id)
  .then(function(data) {
    response.status(201)
  })
}

const deleteFoodFromMeal = (request, response, next) => {
  var meal_id = request.params.meal_id
  var food_id = request.params.id
  Meal.destroy(meal_id, food_id)
  .then(function(data) {
    response.status(201)
  })
}

module.exports = {getMeals, getFoodsForMeal, addFoodToMeal, deleteFoodFromMeal }
