const knex = require('../db/knex')
const bookshelf = require('bookshelf')(knex)
const ModelBase = require('bookshelf-modelbase')(bookshelf)

const Product = require('./product')

//Category
module.exports = ModelBase.extend({
  tableName: 'categories',

  products: function() {
    const Product = require('./product')
    return this.hasMany(Product)
  },

  parentCategory: function() {
    return this.belongsTo(Category)
  },

  childCategories: function() {
    return this.hasMany(Category)
  }
})