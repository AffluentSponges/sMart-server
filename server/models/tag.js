const knex = require('../db/knex')
const bookshelf = require('bookshelf')(knex)
const ModelBase = require('bookshelf-modelbase')(bookshelf)

module.exports = ModelBase.extend({
  tableName: 'tags'
})