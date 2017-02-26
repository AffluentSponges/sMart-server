const knex = require('../db/knex')
const bookshelf = require('bookshelf')(knex)
const ModelBase = require('bookshelf-modelbase')(bookshelf)
bookshelf.plugin(require('bookshelf-modelbase').pluggable)

const Category = ModelBase.extend({
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

module.exports = Category