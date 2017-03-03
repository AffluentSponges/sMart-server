module.exports = function(env) {

  require('dotenv').config()
  //pass in 'test' as an arg to the command line if you want this to init the test db
  process.env.NODE_ENV = env || 'development'
  const environment = process.env.NODE_ENV
  const config = require('./envConfig')[environment];
  const knex = require('knex')(config)

  return knex.schema.hasTable('transactions')
  .then(exists => {return exists ? knex.schema.dropTable('transactions') : null})

  .then(() => {return knex.schema.hasTable('bids')})
  .then(exists => {return exists ? knex.schema.dropTable('bids') : null})

  .then(() => {return knex.schema.hasTable('products')})
  .then(exists => {return exists ? knex.schema.dropTable('products') : null})

  .then(() => {return knex.schema.hasTable('tags')})
  .then(exists => {return exists ? knex.schema.dropTable('tags') : null})

  .then(() => {return knex.schema.hasTable('categories')})
  .then(exists => {return exists ? knex.schema.dropTable('categories') : null})

  .then(() => {return knex.schema.hasTable('users')})
  .then(exists => {return exists ? knex.schema.dropTable('users') : null})

  .then(() => {return knex.schema.hasTable('session')})
  .then(exists => {return exists ? knex.schema.dropTable('session') : null})

  .then(() => {
    return knex.schema.createTable('users', u => {
            u.increments()
            u.string('username')
            u.string('first_name')
            u.string('last_name')
            u.string('googleID')
            u.string('token')
            u.string('email').unique()
            u.string('password')
            u.string('wallet_address')
            u.string('address')
            u.string('address_2')
            u.string('postal_code')
            u.string('city')
            u.string('state') 
            u.string('country')
            u.string('phone_number')
            u.time('preferred_time')
            u.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'))
            u.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'))
          })
  })
  .then(() => {
    return knex.schema.createTable('categories', c => {
            c.increments().unique()
            c.string('name')
            c.integer('parent_category_id').references('id').inTable('categories')
            c.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'))
            c.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'))
          })
  })
  .then(() => {
    return knex.schema.createTable('tags', t => {
            t.increments().unique()
            t.string('tag')
            t.integer('category_id').references('id').inTable('categories')
          })
  })
  .then(() => {
    return knex.schema.createTable('products', p => {
            p.increments()
            p.integer('seller_id').references('id').inTable('users').notNullable()
            p.integer('buyer_id').references('id').inTable('users')
            p.integer('attempted_buyer_id').references('id').inTable('users')
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
            p.string('bitcoin_address')
            // p.dateTime('preferred_time_and_date')
          })
  })
  .then(() => {
    //no native knex way to add this
    return knex.raw('ALTER TABLE products ADD COLUMN image_links text[]')
  })
  // .then(() => {
    // console.log('creating bids table')
    // return knex.schema.createTable('bids', b => {
    //         b.increments()
    //         b.integer('user_id').references('id').inTable('users').notNullable()
    //         b.integer('product_id').references('id').inTable('products')
    //         b.decimal('offer_price')
    //         b.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'))
    //         b.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'))
    //         // b.string('message', 1023)
    //         // b.boolean('accepted')
    //         // b.dateTime('preferred_time')
    //       })
  // })
  .then(() => {
    return knex.schema.createTable('transactions', t => {
            t.increments()
            t.integer('buyer_id').references('id').inTable('users').notNullable() //buyer
            t.integer('product_id').references('id').inTable('products').notNullable()
            t.decimal('sale_price')
            t.string('coinbase_address_id')
            t.string('coinbase_transaction_id')
            t.string('currency')
            t.decimal('amount', 16, 8)
            t.string('status') //buyer_paid, product_in_transit, seller_paid_out (should be enum but oh well)
            t.string('uber_delivery_id').unique()
            // t.decimal('uber_delivery_quote')
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
    return knex.raw('CREATE TABLE "session" ("sid" varchar NOT NULL COLLATE "default", "sess" json NOT NULL, "expire" timestamp(6) NOT NULL) WITH (OIDS=FALSE)')
  })
  .then(() => {
    return knex.raw('ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE')
  })
  .then(() => {
    return knex.destroy()
    // process.exit()
  })
  .catch(err => {
    console.log(err)
    knex.destroy()
    // process.exit()
  })
}
