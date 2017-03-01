const knex = require('../db/knex')
const bookshelf = require('bookshelf')(knex)
const ModelBase = require('bookshelf-modelbase')(bookshelf)
bookshelf.plugin(require('bookshelf-modelbase').pluggable)

const Transaction = ModelBase.extend({
  tableName: 'transactions',

  buyer: function() {
    const User = require('./user')
    return this.belongsTo(User, 'buyer_id')
  },

<<<<<<< HEAD
  // seller: function() {
  //   const User = require('./user')
  //   return this.belongsTo(User, 'seller_id')
  // },
=======
  seller: function() {
    const User = require('./user')
    return this.belongsTo(User, 'seller_id')
  },
>>>>>>> 6b600d7b937274e9907499e720f74dbee143ccbc

  product: function() {
    const Product = require('./product')
    return this.belongsTo(Product)
  }
  
}, {
  addNewTransaction: function(product) {
    var date = new Date()
    date = date.toUTCString()
    return this.upsert({product_id: product.id}, {
      buyer_id: product.attributes.buyer_id,
      sale_price: product.attributes.asking_price,
      status: 'received_payment',
      sale_time_and_date: date
    })
  },

  updateByProductId: function(product_id, options) {
    return this.upsert({product_id: product_id}, options)
  },

  getTransactionInfo: function(delivery_id) {
    return this.where({ uber_delivery_id: delivery_id })
<<<<<<< HEAD
    .fetch({ withRelated: ['buyer', 'product']})
=======
    .fetch({ withRelated: ['buyer', 'seller', 'product']})
>>>>>>> 6b600d7b937274e9907499e720f74dbee143ccbc
  }

});

module.exports = Transaction