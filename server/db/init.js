require('dotenv').config()

var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL,
})

console.log('Connecting to ' + process.env.DATABASE_URL)

// console.log('Attempting to create User Table ', userTableExists)
// console.log('Attemping to create Product Table')
knex.schema.hasTable('transactions')
console.log('dropping transactions table if it exists')
.then(exists => {
  return exists ? knex.schema.dropTable('transactions') : null
})
.then(() => {
  return knex.schema.hasTable('bids')
}) 
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
  return knex.schema.createTable('users', u => {
          u.increments()
          u.string('uname')
          u.string('first_name')
          u.string('last_name')
          u.string('email').unique()
          u.string('password')
          u.string('wallet_address')
          u.string('physical_address')
          u.string('phone_number')
          u.time('preferred_time')
          u.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'))
          u.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'))
        })
})
.then(() => {
  console.log('creating category table')
  return knex.schema.createTable('categories', c => {
          c.increments().unique()
          c.string('name')
          c.integer('parent_category_id').references('id').inTable('categories')
          c.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'))
          c.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'))
        })
})
.then(() => {
  console.log('creating products table')
  return knex.schema.createTable('products', p => {
          p.increments()
          p.integer('seller_id').references('id').inTable('users').notNullable()
          p.integer('buyer_id').references('id').inTable('users')
          p.integer('category_id').references('id').inTable('categories').notNullable()
          p.string('title')
          p.text('description')
          p.integer('quantity').defaultTo(1)
          p.string('address')
          p.string('address_2')
          p.string('postal_code')
          p.string('city').defaultTo('San Francisco')
          p.string('state').defaultTo('CA')
          p.string('country').defaultTo('US')
          p.decimal('asking_price')
          p.boolean('sold').defaultTo('false')
          p.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'))
          p.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'))
          // p.dateTime('preferred_time_and_date')
        })
})
.then(() => {
  console.log('  adding image_links array column to products table')
  //no native knex way to add this
  return knex.raw('ALTER TABLE products ADD COLUMN image_links text[]')
})
.then(() => {
  console.log('creating bids table')
  return knex.schema.createTable('bids', b => {
          b.increments()
          b.integer('buyer_id').references('id').inTable('users').notNullable()
          b.integer('product_id').references('id').inTable('products')
          b.decimal('offer_price')
          b.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'))
          b.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'))
          // b.string('message', 1023)
          // b.boolean('accepted')
          // b.dateTime('preferred_time')
        })
})
.then(() => {
  console.log('created transactions table')
  return knex.schema.createTable('transactions', t => {
          t.increments()
          t.integer('bid_id').references('id').inTable('bids').notNullable()
          t.decimal('sale_price')
          t.string('status') //buyed_paid, product_in_transit, seller_paid_out (should be enum but oh well)
          t.string('uber_delivery_id').unique()
          t.decimal('uber_delivery_quote')
          t.decimal('uber_delivery_price')
          t.dateTime('sale_time_and_date')
          t.dateTime('est_pickup_time_and_date')
          t.dateTime('actual_pickup_time_and_date')
          t.dateTime('est_deliver_time_and_date')
          t.dateTime('actual_delivery_time_and_date')
          t.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'))
          t.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'))
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
















