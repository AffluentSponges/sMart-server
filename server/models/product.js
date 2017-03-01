const knex = require('../db/knex')
const bookshelf = require('bookshelf')(knex)
const ModelBase = require('bookshelf-modelbase')(bookshelf)
bookshelf.plugin(require('bookshelf-modelbase').pluggable)
const Transaction = require('./transaction')

const Product = ModelBase.extend({
  tableName: 'products',

  seller: function() {
    const User = require('./user')
    return this.belongsTo(User, 'seller_id')
  },

  buyer: function() {
    const User = require('./user')
    return this.belongsTo(User, 'buyer_id')
  },

  category: function() {
    const Category = require('./category')
    return this.belongsTo(Category)
  },
  
  transaction: function() {
    const Transaction = require('./transaction')
    return this.hasOne(Transaction)
  }
  
}, {

  getWithSeller: function(id) {
    return this.where({id: id}).fetch({withRelated: ['seller']})
  },

  getWithAllRelated: function(id) {
    return this.where({id: id}).fetch({withRelated: ['seller', 'buyer', 'transaction']})
  },

  getAllBySellerId: function(seller_id) {
    return this.where({seller_id: seller_id}).fetchAll()
  },

  buyProduct: function (product_id, buyer_id) {
    return this.findById(product_id)
    .then(product => {
      //@TODO if it's already bought, send an error!
      return product.set({buyer_id: buyer_id, sold: true}).save()
    })
    .then(product => {
      return Transaction.addNewTransaction(product)
    })
  }
})
module.exports = Product