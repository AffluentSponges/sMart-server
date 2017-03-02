const knex = require('../db/knex')
const bookshelf = require('bookshelf')(knex)
const ModelBase = require('bookshelf-modelbase')(bookshelf)
bookshelf.plugin(require('bookshelf-modelbase').pluggable)

var Tag = ModelBase.extend({
  tableName: 'tags'
})

module.exports = Tag;