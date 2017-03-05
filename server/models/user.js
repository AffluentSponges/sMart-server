const knex = require('../db/knex')
const bookshelf = require('bookshelf')(knex)
const ModelBase = require('bookshelf-modelbase')(bookshelf)
bookshelf.plugin(require('bookshelf-modelbase').pluggable)

module.exports = ModelBase.extend({
  tableName: 'users',

  products: function() {
    const Product = require('./product')
    return this.hasMany(Product)
  },

  transactions: function() {
    const Transaction = require('./transaction')
    return this.hasMany(Transaction)
  }
})