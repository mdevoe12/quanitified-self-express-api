const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

// debugger

const allFoods = (data) => {
  console.log(data.rows)
  process.exit()
}

database.raw(
  'INSERT INTO foods (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?)',
  ["TruBrain", 10, new Date, new Date]
)
.then(() => {
  return database.raw('SELECT * FROM foods')
})
.then(allFoods)


// database.raw('SELECT * FROM foods')
//   .then((data) => {
//     console.log(data.rows)
//     process.exit()
//   })
