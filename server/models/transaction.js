const knex = require('../db/knex')
const bookshelf = require('bookshelf')(knex)
const ModelBase = require('bookshelf-modelbase')(bookshelf)
bookshelf.plugin(require('bookshelf-modelbase').pluggable)

console.log('LOADING TRANSACTIONS')
const Transaction = ModelBase.extend({
  tableName: 'transactions',

  user: function() {
    const User = require('./user')
    return this.belongsTo(User)
  },

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
      status: 'processing_buyer_payment',
      sale_time_and_date: date
    })
  }
});

module.exports = Transaction