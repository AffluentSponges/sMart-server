require('dotenv').config()

var knex = require('knex')({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
})

console.log('Connecting to ' + process.env.PG_CONNECTION_STRING)


// console.log('Attempting to create User Table ', userTableExists)
// console.log('Attemping to create Product Table')
knex.schema.hasTable('bids')
.then(exists => {
  console.log('dropping bids table if it exists')
  return exists ? knex.schema.dropTable('bids') : null
})
.then(() => {
  return knex.schema.hasTable('products')
})
.then(exists => {
  console.log('dropping products table if it exists')
  return exists ? knex.schema.dropTable('products') : null
})
.then(() => {
  return knex.schema.hasTable('categories')
})
.then(exists => {
  console.log('dropping categories table if it exists')
  return exists ? knex.schema.dropTable('categories') : null
})
.then(() => {
  return knex.schema.hasTable('users')
})
.then(exists => {
  console.log('dropping users table if it exists')
  return exists ? knex.schema.dropTable('users') : null
})
.then(() => {
  console.log('creating users table')
  return knex.schema.createTable('users', user => {
          user.increments()
          user.string('username').unique()
          user.string('password')
          user.string('wallet_address')
          user.string('physical_address')
          user.string('phone_number')
          user.time('preferred_time')
          user.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'))
          user.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'))
        })
})
.then(() => {
  console.log('creating category table')
  return knex.schema.createTable('categories', category => {
          category.increments().unique()
          category.string('name')
          category.integer('parent_category_id').references('id').inTable('categories')
          category.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'))
          category.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'))
        })
})
.then(() => {
  console.log('creating products table')
  return knex.schema.createTable('products', product => {
          product.increments()
          product.integer('seller_id').references('id').inTable('users').notNullable()
          product.integer('buyer_id').references('id').inTable('users')
          product.integer('category_id').references('id').inTable('categories').notNullable()
          product.string('title')
          product.text('description')
          product.integer('quantity').defaultTo(1)
          // product.integer('width')
          // product.integer('height')
          // product.integer('length')
          // product.integer('weight')
          product.string('address')
          product.string('address_2')
          product.string('postal_code')
          product.string('city').defaultTo('San Francisco')
          product.string('state').defaultTo('CA')
          product.string('country').defaultTo('US')
          product.decimal('asking_price')
          product.boolean('sold').defaultTo('false')
          product.decimal('sale_price')
          product.dateTime('preferred_time_and_date')
          product.dateTime('sale_time_and_date')
          product.dateTime('est_pickup_time_and_date')
          product.dateTime('actual_pickup_time_and_date')
          product.dateTime('est_deliver_time_and_date')
          product.dateTime('actual_delivery_time_and_date')
          product.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'))
          product.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'))
        })
})
.then(() => {
  console.log('  adding image_links array column to products table')
  //no native knex way to add this
  return knex.raw('ALTER TABLE products ADD COLUMN image_links text[]')
})
.then(() => {
  console.log('creating bids table')
  return knex.schema.createTable('bids', bid => {
          bid.increments()
          bid.integer('buyer_id').references('id').inTable('users').notNullable()
          bid.integer('product_id').references('id').inTable('products')
          bid.decimal('offer_price', 2)
          bid.string('message', 1023)
          bid.boolean('accepted')
          bid.dateTime('preferred_time')
          bid.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'))
          bid.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'))
        })
})
.then(() => {
  console.log('exiting with no errors')
  knex.destroy()
  process.exit()
})
.catch(err => {
  console.log(err)
  knex.destroy()
  process.exit()
})


  // console.log('No Product Table created')















