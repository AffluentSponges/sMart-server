module.exports = function(env) {
  //pass in 'test' as an arg to the command line if you want this to seed the test db
  process.env.NODE_ENV = env || 'development'
  const knex = require('./knex')
  const db = require('../models')
  const {
    usersArray,
    categoryArray,
    productArray,
    transactionArray
  } = require('./seedData')

  var insertRow = function(seedDataArray, tableName, i, uniqueName) {
    var name = seedDataArray[i][uniqueName]
    return knex(tableName).where({[uniqueName]: name}).first()
    .then(row => {
      return !row ? knex(tableName).insert(seedDataArray[i]) : null
    })
  }

  var users = []
  var categories = []
  var products = []
  var transactions = []

  for(var i = 0; i < usersArray.length; i++) {
    users.push(insertRow(usersArray, 'users', i, 'username'))
  }

  for(var i = 0; i < categoryArray.length; i++) {
    categories.push(insertRow(categoryArray, 'categories', i, 'name'))
  }

  for(var i = 0; i < productArray.length; i++) {
    products.push(insertRow(productArray, 'products', i, 'title'))
  }

  for(var i = 0; i < transactionArray.length; i++) {
    transactions.push(insertRow(transactionArray, 'transactions', i, 'id'))
  }

  // if(process.env.NODE_ENV === 'test') {
    users.push(knex.raw(`ALTER SEQUENCE users_id_seq RESTART WITH ${usersArray.length+1}`))
    categories.push(knex.raw(`ALTER SEQUENCE categories_id_seq RESTART WITH ${categoryArray.length+1}`))
    products.push(knex.raw(`ALTER SEQUENCE products_id_seq RESTART WITH ${productArray.length+1}`))
    transactions.push(knex.raw(`ALTER SEQUENCE transactions_id_seq RESTART WITH ${transactionArray.length+1}`))
  // }

  Promise.all(users)
  .then(() => {
    return Promise.all(categories)
  })
  .then(() => {
    return Promise.all(products)
  })
  .then(() => {
    return Promise.all(transactions)
  })
  .then(values => {
    console.log('done seeding data. exiting gracefully')
    // knex.destroy()
    knex.destroy()
    // process.exit()
  })
  .catch(err => {
    console.log(err)
    knex.destroy()
    process.exit()
  })
}