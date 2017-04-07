## Intro

DeliveredSF (formerly s-Mart) is a marketplace like LetGo (or Craigslist) with integrated payments, pick-up, & delivery. When posting an item for sale, the seller includes a pick-up address and bitcoin wallet address. When purchasing an item, the Buyer scans the unique btc address QR code and sends the listed amount of btc. Once the transaction has posted (which is near-instant, thanks to Coinbase) an uberRUSH is dispatched to pick up the item from the seller and drop it off at the buyer's location. Once Uber has completed the dropoff, the btc (minus the uberRUSH fee) is sent to the seller's wallet. Updates regarding the status of pick-up and dropoff are sent to both the buyer and seller via Twilio throughout the process.

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

save and close the ```.env``` file


## ngrok

We used ngrok so we could pass some external API's requirements that we are on https

```
npm install ngrok -g
ngrok http 3000
````

Set your ```HOST_URL``` in your .env file to your ngrok url. it will look something like:
```
https://954fdb5b.ngrok.io
```


## API Keys

You will need the API Keys from the following services:

Google

UberRUSH (including access token)

Coinbase

Twilio

Microsoft Vision

AWS

Your .env file should like this:

```
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CB_URL=
DATABASE_URL=
TEST_DATABASE_URL=
UBER_RUSH_ID=
UBER_RUSH_SECRET=
COINBASE_KEY=
COINBASE_SECRET=
COINBASE_BTC_ACCOUNT=
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_NUMBER=
MS_VISION=
AWS_Access_Key_ID=
AWS_Secret_Access_Key=
HOST_URL=
UBER_RUSH_ACCESS_TOKEN=
```

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