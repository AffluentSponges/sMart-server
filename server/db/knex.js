require('dotenv').config();

const environment = process.env.NODE_ENV || 'development';
const config = require('./envConfig')[environment];
const knex = require('knex')(config)

console.log('Connecting to ' + config.connection)

module.exports = knex