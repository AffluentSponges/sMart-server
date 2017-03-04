module.exports = function(env, initialzing) {
  var initialzing = initialzing || false
  //pass in 'test' as an arg to the command line if you want this to seed the test db
  process.env.NODE_ENV = env || 'development'
  const knex = require('./knex')
  const db = require('../models')
  const {
    usersArray,
    categoryArray,
    productArray,
    transactionArray,
    tagArray
  } = require('./seedData')

  //drops all tables becuase transactions is related to all the others
  //either directly or through another table
  var truncateTables = function() {
    return knex.raw(`TRUNCATE TABLE transactions RESTART IDENTITY CASCADE`)
  }

  var insertArray = function(seedDataArray, tableName, unique) {
    return seedDataArray.map((item, index, array) => {
      var name = array[index][unique]
      return knex(tableName).where({[unique]: name}).first()
      .then(row => {
      return !row ? knex(tableName).insert(seedDataArray[index]) : null
      })
    })
  }

  var fixSequenceIds = function(array, tableName) {
    return knex.raw(`ALTER SEQUENCE ${tableName}_id_seq RESTART WITH ${array.length+1}`)
  }

  return truncateTables()
  .then(() => {
    var users = insertArray(usersArray, 'users', 'username')
    users.push(fixSequenceIds(usersArray, 'users'))
    return Promise.all(users)
  })
  .then(() => {
    var categories = insertArray(categoryArray, 'categories', 'name')
    categories.push(fixSequenceIds(categoryArray, 'categories'))
    return Promise.all(categories)
  })
  .then(() => {
    var tags = insertArray(tagArray, 'tags', 'tag')
    tags.push(fixSequenceIds(tagArray, 'tags'))
    return Promise.all(tags)
  })
  .then(() => {
    var products = insertArray(productArray, 'products', 'title')
    products.push(fixSequenceIds(productArray, 'products'))
    return Promise.all(products)
  })
  .then(() => {
    var transactions = insertArray(transactionArray, 'transactions', 'id')
    transactions.push(fixSequenceIds(transactionArray, 'transactions'))
    return Promise.all(transactions)
  })
  .then(values => {
    if(initialzing) {
      console.log('done seeding data. exiting gracefully')
      return knex.destroy()
    }
    // process.exit()
  })
  .catch(err => {
    console.log(err)
    knex.destroy()
    process.exit()
  })

}