let randArray = [1, 2, 3]
let randNum;

exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE meal_foods RESTART IDENTITY CASCADE; TRUNCATE foods RESTART IDENTITY CASCADE; TRUNCATE meals RESTART IDENTITY CASCADE')
  .then(function() {
    return Promise.all([
      knex.raw(
        'INSERT INTO foods (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?)',
        ["Beef Stew", 250, new Date, new Date]
      ),
      knex.raw(
        'INSERT INTO foods (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?)',
        ["Starburst", 30, new Date, new Date]
      ),
      knex.raw(
        'INSERT INTO foods (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?)',
        ["Brown Rice", 150, new Date, new Date]
      ),
      knex.raw(
        'INSERT INTO meals (name, created_at, updated_at) VALUES (?, ?, ?)',
        ["Breakfast", new Date, new Date]
      ),
      knex.raw(
        'INSERT INTO meals (name, created_at, updated_at) VALUES (?, ?, ?)',
        ["Lunch", new Date, new Date]
      ),
      knex.raw(
        'INSERT INTO meals (name, created_at, updated_at) VALUES (?, ?, ?)',
        ["Dinner", new Date, new Date]
      ),
      knex.raw(
        'INSERT INTO meals (name, created_at, updated_at) VALUES (?, ?, ?)',
        ["Snack", new Date, new Date]
      ),
      randNum = function() {return randArray[Math.floor(Math.random() * randArray.length)]},
      knex.raw('INSERT INTO meal_foods (food_id, meal_id) VALUES (?, ?)',
        [randNum(), randNum()]
      ),
      knex.raw('INSERT INTO meal_foods (food_id, meal_id) VALUES (?, ?)',
        [randNum(), randNum()]
      ),
      knex.raw('INSERT INTO meal_foods (food_id, meal_id) VALUES (?, ?)',
        [randNum(), randNum()]
      ),
      knex.raw('INSERT INTO meal_foods (food_id, meal_id) VALUES (?, ?)',
        [randNum(), randNum()]
      ),
      knex.raw('INSERT INTO meal_foods (food_id, meal_id) VALUES (?, ?)',
        [randNum(), randNum()]
      ),
      knex.raw('INSERT INTO meal_foods (food_id, meal_id) VALUES (?, ?)',
        [randNum(), randNum()]
      ),
      knex.raw('INSERT INTO meal_foods (food_id, meal_id) VALUES (?, ?)',
        [randNum(), randNum()]
      ),
      knex.raw('INSERT INTO meal_foods (food_id, meal_id) VALUES (?, ?)',
        [randNum(), randNum()]
      ),
      knex.raw('INSERT INTO meal_foods (food_id, meal_id) VALUES (?, ?)',
        [randNum(), randNum()]
      )
    ])
  })
}
