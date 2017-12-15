const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);
const Food = require('../models/food')

const index = (request, response, next) => {
  Food.getFoodIndex()
    .then(function(data) {
      if(data.rowCount == 0) { return response.sendStatus(404) }

      response.status(200).json(data.rows)
    })
}

const show = (request, response, next) => {
  let id = request.params.id

  Food.getWithId(id)
    .then(function(data) {
      if(data.rowCount == 0) { return response.sendStatus(404) }

      response.status(200).json(data.rows[0])
    })
}

const create = (request, response, next) => {
  let name = request.body.food.name
  let calories = request.body.food.calories

  Food.createFood(name, calories)
    .then(function(data) {
      response.status(201).json(data.rows[0])
    })
}

const update = (request, response, next) => {
  let id = request.params.id
  let name = request.body.food.name
  let calories = request.body.food.calories

  return Food.updateFood(id, name, calories)
  .then(function(data) {
    response.status(202).json(data.rows[0])
  });
}

const destroy = (request, response, next) => {
  let id = request.params.id

  return Food.deleteFood(id)
  .then((data) => {
    response.sendStatus(202);
  })
}

module.exports = {
  index, show, create, update, destroy
}
