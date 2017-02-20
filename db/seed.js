const bcrypt = require('bcrypt-nodejs')
db = require('./db')

db.User.create({
  username: 'brenner-test',
  password: bcrypt.hashSync('testpassword'),
  wallet_address: 'none',
  physical_address: '400 baker st SF, CA 94117',
  phone_number: '111-222-3333',
  preferred_time: '16:30:00 PST'
})
.then(() => {
  db.knex.destroy()
  process.exit()
})
.catch(err => {
  console.log(err)
  db.knex.destroy()
  process.exit()
})