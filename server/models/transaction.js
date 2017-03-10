const knex = require('../db/knex')
const bookshelf = require('bookshelf')(knex)
const ModelBase = require('bookshelf-modelbase')(bookshelf)

const statuses = [
  'buyer_paid',
  'en_route_to_pickup',
  'at_pickup',
  'en_route_to_dropoff',
  'at_dropoff',
  'completed'
]

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
      status: 'buyer_paid',
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
    var previousTransaction
    return this.where({uber_delivery_id: delivery_id}).fetch({withRelated: ['seller', 'buyer', 'product']})
    .then(transaction => {
      if(!transaction) {return null}
      previousTransaction = transaction.clone()
      return transaction.set(attributesObj) //, {withRelated: ['seller', 'buyer', 'product']})
    })
    .then(transaction => {
      if(!transaction) {return null}
      const newStatus = transaction.attributes.status
      const oldStatus = transaction._previousAttributes.status
      const updated = (statuses.indexOf(newStatus) > statuses.indexOf(oldStatus))
      return updated ? transaction.save() : null
    })
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
  },

  getItemTransactionHistory: function(product_id) {
    return this.where({product_id: product_id}).fetch({withRelated:['product']});
  }

});
