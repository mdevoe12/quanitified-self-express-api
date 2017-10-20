exports.up = function(knex, Promise) {
 let createQuery = `CREATE TABLE meal_foods(
  id SERIAL PRIMARY KEY NOT NULL,
  food_id INT REFERENCES foods(ID),
  meal_id INT REFERENCES meals(ID)
 )`
  return knex.raw(createQuery)
};

exports.down = function(knex, Promise) {
  let dropQuery = (`DROP TABLE meal_foods`)
  return knex.raw(dropQuery)
};
