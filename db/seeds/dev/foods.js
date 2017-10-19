exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE foods RESTART IDENTITY')
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
      )
    ])
  })
}
