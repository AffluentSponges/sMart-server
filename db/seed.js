const bcrypt = require('bcrypt-nodejs')
db = require('./db')


var usersArray = [
  {
  username: 'brenner-test',
  password: bcrypt.hashSync('testpassword'),
  wallet_address: 'none',
  physical_address: '400 baker st SF, CA 94117',
  phone_number: '111-222-3333',
  preferred_time: '16:30:00 PST'
  },
  {
  username: 'daniel-test',
  password: bcrypt.hashSync('testpassword'),
  wallet_address: 'none',
  physical_address: '944 market st SF, CA 94117',
  phone_number: '111-222-4444',
  preferred_time: '11:30:00 PST'
  },
  {
  username: 'greg-test',
  password: bcrypt.hashSync('testpassword'),
  wallet_address: 'none',
  physical_address: '556 mission st SF, CA 94117',
  phone_number: '111-222-4444',
  preferred_time: '9:30:00 PST'
  },
  {
  username: 'mark-test',
  password: bcrypt.hashSync('testpassword'),
  wallet_address: 'none',
  physical_address: '200 Valencia st SF, CA 94117',
  phone_number: '111-222-4444',
  preferred_time: '20:30:00 PST'
  }
]


var createUser = function(i) {
  var name = usersArray[i].username
  return db.knex('users').where({username: name}).first()
  .then(user => {
    return !user ? db.knex('users').insert(usersArray[i]) : null
  })
}

var promiseArray = []

for(var i = 0; i < usersArray.length; i++) {
  promiseArray.push(createUser(i))
}


Promise.all(promiseArray)
.then(values => {
  console.log(values)
  console.log('exiting gracefully')
  db.knex.destroy()
  process.exit()
})
.catch(err => {
  console.log(err)
  db.knex.destroy()
  process.exit()
})



// db.User.findOrCreate({
//   username: 'brenner-test',
//   password: bcrypt.hashSync('testpassword'),
//   wallet_address: 'none',
//   physical_address: '400 baker st SF, CA 94117',
//   phone_number: '111-222-3333',
//   preferred_time: '17:30:00 PST'
// },
// {username: "brenner-test"})
// .then(function(val) {
//   console.log('val: ', val)
//   return db.User.findOrCreate({
//     username: 'daniel-test',
//     password: bcrypt.hashSync('testpassword'),
//     wallet_address: 'none',
//     physical_address: '944 market st SF, CA 94117',
//     phone_number: '111-222-4444',
//     preferred_time: '17:30:00 PST'
//   },
//   {username: "daniel-test"})
// })
// .then(function() {
//   console.log('Done seeding, exiting gracefully')
//   db.knex.destroy()
//   process.exit()
// })
// .catch(function(err) {
//   console.log(err)
//   db.knex.destroy()
//   process.exit()
// })





// db.User.findOne({username: "brenner-test"})
// .then(function(user) {
//   console.log(user)
//   console.log('Done seeding, exiting gracefully')
//   db.knex.destroy()
//   process.exit()
// })
// .catch(function(err) {
//   console.log(err)
//   db.knex.destroy()
//   process.exit()
// })