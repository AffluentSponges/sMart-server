module.exports = function(env) {
  //pass in 'test' as an arg to the command line if you want this to seed the test db
  process.env.NODE_ENV = env || 'development'

  const db = require('./db')
  const {
    usersArray,
    categoryArray,
    productArray
  } = require('./seedData')

  var insertRow = function(seedDataArray, tableName, i, uniqueName) {
    var name = seedDataArray[i][uniqueName]
    return db.knex(tableName).where({[uniqueName]: name}).first()
    .then(row => {
      return !row ? db.knex(tableName).insert(seedDataArray[i]) : null
    })
  }

  var promiseArray = []

  if(process.env.NODE_ENV === 'test') {
    promiseArray.push(db.knex('users').del())
    promiseArray.push(db.knex('categories').del())
    promiseArray.push(db.knex('products').del())
  }

  for(var i = 0; i < usersArray.length; i++) {
    promiseArray.push(insertRow(usersArray, 'users', i, 'username'))
  }

  for(var i = 0; i < categoryArray.length; i++) {
    promiseArray.push(insertRow(categoryArray, 'categories', i, 'name'))
  }

  for(var i = 0; i < productArray.length; i++) {
    promiseArray.push(insertRow(productArray, 'products', i, 'title'))
  }

  Promise.all(promiseArray)
  .then(values => {
    console.log('done seeding data. exiting gracefully')
    // db.knex.destroy()
    db.knex.destroy()
    // process.exit()
  })
  .catch(err => {
    console.log(err)
    db.knex.destroy()
    process.exit()
  })
}