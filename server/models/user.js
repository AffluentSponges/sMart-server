const knex = require('../db/knex')
const bookshelf = require('bookshelf')(knex)
const ModelBase = require('bookshelf-modelbase')(bookshelf)
bookshelf.plugin(require('bookshelf-modelbase').pluggable)

const User = ModelBase.extend({
  tableName: 'users',

  products: function() {
    return this.hasMany(Product)
  },

  transactions: function() {
    return this.hasMany(Transaction)
  }
})

module.exports = User