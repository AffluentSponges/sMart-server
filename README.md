## Intro

DeliveredSF (formerly s-Mart) is a marketplace like LetGo (or craigslist) with integrated payments, pick-up, & delivery. When posting an item for sale, the seller includes a pick-up address and bitcoin wallet address. When purchasing an item, the Buyer scans the unique btc address QR code and sends the listed amount of btc. Once the transaction has posted (which is near-instant, thanks to Coinbase) an uberRUSH is dispatched to pick up the item from the seller and drop it off at the buyer's location. Once Uber has completed the dropoff, the btc (minus the uberRUSH fee) is sent to the seller's wallet.

## To run this locally:

Add a .env file:
```touch .env```


Add the postgres database:
```
psql
create database smart_server_dev;
create database smart_server_test;
\q


open .env
```
copy&paste this -> ```DATABASE_URL=postgres://USERNAME:@localhost:5432/smart_server_dev```

copy&paste this -> ```TEST_DATABASE_URL=postgres://USERNAME:@localhost:5432/smart_server_test```

into the .env file. replace ```USERNAME``` with the name that appears before the ```=#``` when you do ```psql```

add these two lines too: 

```
PORT=4040
SESSION_SECRET_KEY=ASDFQWERLKJ
```

save and close the ```.env``` file

## API Keys

You will need the API Keys from the following services: \n
Google \n
UberRUSH (including access token) \n
Coinbase \n
TWilio \n
Microsoft vision \n
AWS \n

## Running & Testing

```npm install```

```npm run init-db``` to construct the database schema. this will most likely clear any data in it.

```npm run seed-db``` to seed the database with some dummy data

```npm run dev``` to run on a dev environment

For testing: 

```npm run test-db``` - it mightg throw an error if it does. for now, just rerun it until it works lol

To test run ```npm test```


## API Guide

### GET v1/categories

Get a list of categories

### GET v1/items

Get a list of items which we want to show on home screen

### GET v1/items/{category_id}

Get a list of items of {category_id}

### GET v1/item/{item_id}

Get details of item of {item_id}

### POST v1/item

POST item