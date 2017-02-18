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
  return exists ? knex.schema.dropTable('bids') : Promise.resolve(undefined)
})
.then(() => {
  return knex.schema.hasTable('products')
})
.then(exists => {
  console.log('dropping products table if it exists')
  return exists ? knex.schema.dropTable('products') : Promise.resolve(undefined)
})
.then(() => {
  return knex.schema.hasTable('categories')
})
.then(exists => {
  console.log('dropping categories table if it exists')
  return exists ? knex.schema.dropTable('categories') : Promise.resolve(undefined)
})
.then(() => {
  return knex.schema.hasTable('users')
})
.then(exists => {
  console.log('dropping users table if it exists')
  return exists ? knex.schema.dropTable('users') : Promise.resolve(undefined)
})
.then(() => {
  console.log('creating users table')
  return knex.schema.createTable('users', user => {
          user.increments()
          user.string('username')
          user.string('password')
          user.string('wallet_address')
          user.string('physical_address')
          user.string('phone_number')
          user.dateTime('preferred_time')
          user.timestamps()
        })
})
.then(() => {
  console.log('creating category table')
  return knex.schema.createTable('categories', category => {
          category.increments()
          category.string('name')
          category.integer('parent_category_id').references('id').inTable('categories')
          category.timestamps()
        })
})
.then(() => {
  console.log('creating products table')
  return knex.schema.createTable('products', products => {
          products.increments()
          products.integer('seller_id').references('id').inTable('users').notNullable()
          products.integer('buyer_id').references('id').inTable('users')
          products.integer('category_id').references('id').inTable('categories').notNullable()
          products.string('title')
          products.text('description')
          products.integer('quantity')
          products.integer('width')
          products.integer('height')
          products.integer('length')
          products.integer('weight')
          products.decimal('asking_price', 2)
          products.boolean('sold')
          products.decimal('sale_price', 2)
          products.dateTime('preferred_time')
          products.dateTime('sale_time')
          products.dateTime('est_pickup_time')
          products.dateTime('actual_pickup_time')
          products.dateTime('est_deliver_time')
          products.dateTime('actual_delivery_time')
          products.timestamps()
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
          bid.timestamps()
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















