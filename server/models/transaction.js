const knex = require('../db/knex')
const bookshelf = require('bookshelf')(knex)
const ModelBase = require('bookshelf-modelbase')(bookshelf)

module.exports = ModelBase.extend({
  tableName: 'transactions',

  buyer: function() {
    const User = require('./user')
    return this.belongsTo(User, 'buyer_id')
  },

  seller: function() {
    const User = require('./user')
    const Product = require('./product')
    return this.belongsTo(User, 'seller_id').through(Product)
  },

  product: function() {
    const Product = require('./product')
    return this.belongsTo(Product)
  }
  
}, {

  addNewTransaction: function(product, info) {
    var date = new Date()
    date = date.toUTCString()
    return this.create({
      product_id: product.id,
      buyer_id: product.attributes.buyer_id,
      sale_price: product.attributes.asking_price,
      status: 'received_payment',
      sale_time_and_date: date,
      coinbase_address_id: info.coinbase_address_id,
      currency: info.currency,
      sale_price_btc: info.amount,
      coinbase_transaction_id: info.coinbase_transaction_id
    })
  },

  updateByProductId: function(product_id, attributesObj) {
    return this.upsert({product_id: product_id}, attributesObj)
  },

  updateByDeliveryId: function(delivery_id, attributesObj) {
    return this.upsert({uber_delivery_id: delivery_id}, attributesObj, {withRelated: ['seller', 'buyer', 'product']})
  },

  getByDeliveryId: function(delivery_id) {
    return this.where({ uber_delivery_id: delivery_id })
    .fetch({ withRelated: ['buyer', 'seller', 'product']})
  },

  getWithAllRelated: function(id) {
    return this.where({id: id}).fetch({withRelated: ['seller', 'buyer', 'product']})
  },

  getItemsOnDelivery: function(buyer_id) {
    return this.where({buyer_id: buyer_id}).fetchAll({withRelated:['product']});
  }

});
