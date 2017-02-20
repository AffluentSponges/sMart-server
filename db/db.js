require('dotenv').config();
var knex = require('knex')({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
})

console.log('Connecting to ' + process.env.PG_CONNECTION_STRING)

var bookshelf = require('bookshelf')(knex)
var ModelBase = require('bookshelf-modelbase')(bookshelf)
bookshelf.plugin(require('bookshelf-modelbase').pluggable)



var db = {}

db.User = ModelBase.extend({
  tableName: 'users'
})

db.Product = ModelBase.extend({
  tableName: 'products'
})

db.Category = ModelBase.extend({
  tableName: 'categories'
})

db.Bid = ModelBase.extend({
  tableName: 'bids'
})

db.knex = knex

module.exports = db


//examples
// User.create({ firstName: 'Grayson' })
// .then(function () {
//   return User.findOne({ firstName: 'Grayson' }, { require: true });
// })
// .then(function (grayson) {
//   // passes patch: true to .save() by default
//   return User.update({ firstName: 'Basil' }, { id: grayson.id });
// })
// .then(function (basil) {
//   return User.destroy({ id: basil.id });
// })
// .then(function () {
//   return User.findAll();
// })
// .then(function (collection) {
//   console.log(collection.models.length); // => 0
// })

