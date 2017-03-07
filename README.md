Add a .env file:
```touch .env```


Add the postgres database:
```
psql
create user postgres with superuser createdb; //this is because travis-ci uses this username as its user, so we are also going to for our test db
create database smart_server_dev;
create database smart_server_test;
\q


open .env
```
copy&paste this -> ```DATABASE_URL=postgres://USERNAME:@localhost:5432/smart_server_dev```

copy&paste this -> ```TEST_DATABASE_URL=postgres://postgres:@localhost:5432/smart_server_test```

into the .env file. replace ```USERNAME``` with the name that appears before the ```=#``` when you do ```psql```

add these two lines too: 

``` PORT=4040
SESSION_SECRET_KEY=ASDFQWERLKJ
```

save and close the ```.env``` file

```npm install```

```npm run init-db``` to construct the database schema. this will most likely clear any data in it.

```npm run seed-db``` to seed the database with some dummy data

```npm run dev``` to run on a dev environment

For testing: 

```npm run test-db``` - it might throw an error if it does. for now, just rerun it until it works lol

To test run ```npm test```



# sMart-web-server

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











### GET /deliveries

Query Parameters

| Name        | Type            | Description| 
| ----------- | --------------- | ---------  | 
| CRUD OP     | CREATE          | READ       | 
| /dogs       | Create new dogs | List dogs  | 
| /dogs/1234  | Error           | Show Bo    | 

Response

Status-Code: 200 OK
Response body:

    {
       "count":172,
       "next_page":"status=completed&limit=10&offset=10",
       "previous_page":"",
       "deliveries":[
          {
            // Delivery object 1 (omitted for clarity)
          },
          {
            // Delivery object 2 (omitted for clarity)
          },
          // ... More delivery objects
       ]
    }

### POST /deliveries

| Name        | Type            | Description| 
| ----------- | --------------- | ---------  | 
| CRUD OP     | CREATE          | READ       | 
| /dogs       | Create new dogs | List dogs  | 
| /dogs/1234  | Error           | Show Bo    | 

Request body:

    [
        {
            "title": "Raising Revenue",
            "author_first_name": "Jane",
            "author_last_name": "Smith",
            "author_email": "jane.smith@example.gov",
            "year": "2012",
            "month": "August",
            "day": "18",
            "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. vehicula sit amet tristique lorem blandit. Nam augue est, bibendum et ultrices non, interdum in est. Quisque gravida orci lobortis... "
        }
    ]
    
### POST /deliveries/quote

### GET /deliveries/{delivery_id}

### GET /deliveries/{delivery_id}/receipt

### GET /deliveries/{delivery_id}/ratings

### POST /deliveries/{delivery_id}/ratings

### GET /deliveries/{delivery_id}/rating_tags

### POST /deliveries/{delivery_id}/cancel

### GET /deliveries/regions
