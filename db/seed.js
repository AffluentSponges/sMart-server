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
  // console.log(values)
  console.log('done seeding data. exiting gracefully')
  db.knex.destroy()
  process.exit()
})
.catch(err => {
  console.log(err)
  db.knex.destroy()
  process.exit()
})