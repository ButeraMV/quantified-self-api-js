const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database = require('knex')(configuration)

const create = (meal_id, food_id) => {
  return database.raw(
      `INSERT INTO meal_foods (food_id, meal_id) VALUES (?,?)`, [food_id, meal_id]
    )
};

const index = () => {
  return database.raw(`
    SELECT meals.id, meals.name, json_agg(foods.*)
    AS foods
    FROM meals
    LEFT OUTER JOIN meal_foods
    ON meals.id=meal_foods.meal_id
    LEFT OUTER JOIN foods ON meal_foods.food_id=foods.id
    GROUP BY meals.id
    ORDER BY meals.id
    `)
}

const show = (id) => {
  return database.raw(`
    SELECT meals.id, meals.name, json_agg(foods.*)
    AS foods
    FROM meals
    LEFT OUTER JOIN meal_foods
    ON meals.id=meal_foods.meal_id
    LEFT OUTER JOIN foods ON meal_foods.food_id=foods.id
    WHERE meals.id = ?
    GROUP BY meals.id
    `, [id])
}

let destroy = (meal_id, food_id) => {
  return database.raw(
    `DELETE FROM meal_foods
    WHERE food_id = ?
    AND meal_id = ?`, [food_id, meal_id])
}

module.exports = {
  create, index, destroy, show
}
