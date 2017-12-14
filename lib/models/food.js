const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

const getFoodIndex = () => {
  return database.raw('SELECT * FROM foods')
}

const getWithId = (id) => {
  return database.raw("SELECT * FROM foods WHERE id=?", [id])
}

const createFood = (name, calories) => {
  return database.raw(
    'INSERT INTO foods (name, calories) VALUES (?, ?) RETURNING *',
    [name, calories]
  )
}

const updateFood = (id, name, calories) => {
  console.log(name)
  console.log(calories)
  if(name == undefined) {
    return database.raw(
      'UPDATE foods SET calories = ? WHERE id=?',
      [calories, id]
    )
  } else {
    return database.raw(
      'UPDATE foods SET name = ? WHERE id=?',
      [name, id]
    )
  }
}

const deleteFood = (id) => {
  return database.raw('DELETE FROM foods WHERE id = ? RETURNING *', [id])
}

module.exports = {
  getFoodIndex, getWithId, createFood, updateFood, deleteFood
}
