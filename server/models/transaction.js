const knex = require('../db/knex')
const bookshelf = require('bookshelf')(knex)
const ModelBase = require('bookshelf-modelbase')(bookshelf)
bookshelf.plugin(require('bookshelf-modelbase').pluggable)

const Transaction = ModelBase.extend({
  tableName: 'transactions',

  user: function() {
    return this.belongsTo(User)
  },

  product: function() {
    return this.belongsTo(Product)
  }
  
}, {
  addNewTransaction: function(product) {
    var date = new Date()
    date = date.toUTCString()
    return db.Transaction.upsert({product_id: product.id}, {
      user_id: product.attributes.buyer_id,
      sale_price: product.attributes.asking_price,
      status: 'processing_buyer_payment',
      sale_time_and_date: date
    })
  }
});


module.exports = Transaction