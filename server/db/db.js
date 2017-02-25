require('dotenv').config();

const environment = process.env.NODE_ENV || 'development';
const config = require('./envConfig')[environment];
const knex = require('knex')(config)

console.log('Connecting to ' + config.connection)

var bookshelf = require('bookshelf')(knex)
var ModelBase = require('bookshelf-modelbase')(bookshelf)
bookshelf.plugin(require('bookshelf-modelbase').pluggable)



var db = {}

var User = ModelBase.extend({
  tableName: 'users',

  products: function() {
    return this.hasMany(Product)
  },

  transactions: function() {
    return this.hasMany(Transaction)
  }
})

var Product = ModelBase.extend({
  tableName: 'products',

  seller: function() {
    return this.belongsTo(User, 'seller_id')
  },

  buyer: function() {
    return this.belongsTo(User, 'buyer_id')
  },

  category: function() {
    return this.belongsTo(Category)
  },
  
  transaction: function() {
    return this.hasOne(Transaction)
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

// var Bid = ModelBase.extend({
//   tableName: 'bids',

//   product: function() {
//     return this.belongsTo(Product)
//   },

//   user: function() {
//     return this.belongsTo(User)
//   },

//   transaction: function() {
//     return this.hasOne(Transaction)
//   }
// })

var Transaction = ModelBase.extend({
  tableName: 'transactions',

  user: function() {
    return this.belongsTo(User)
  },

  product: function() {
    return this.belongsTo(Product)
  }
});


db.User = User
db.Product = Product
db.Category = Category
// db.Bid = Bid
db.Transaction = Transaction

db.knex = knex

module.exports = db