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

var User = ModelBase.extend({
  tableName: 'users',

  products: function() {
    return this.hasMany(Product)
  },

  bids: function() {
    return this.hasMany(Bid)
  }
})

var Product = ModelBase.extend({
  tableName: 'products',

  user: function() {
    return this.belongsTo(User)
  },

  category: function() {
    return this.belongsTo(Category)
  },
  
  bids: function() {
    return this.hasMany(Bid)
  }
})

var Category = ModelBase.extend({
  tableName: 'categories',

  products: function() {
    return this.hasMany(Product)
  },

  parentCategory: function() {
    return this.belongsTo(Category)
  },

  childCategories: function() {
    return this.hasMany(Category)
  }
})

var Bid = ModelBase.extend({
  tableName: 'bids',

  product: function() {
    return this.belongsTo(Product)
  },

  user: function() {
    return this.belongsTo(User)
  }
})

db.User = User
db.Product = Product
db.Category = Category
db.Bid = Bid

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

