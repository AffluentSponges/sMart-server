Add a .env file:
```touch .env```


Add the postgres database:
```
psql
create database smart_server_dev;
\q


open .env
```
copy&paste this -> ```PG_CONNECTION_STRING=postgres://USERNAME:@localhost:5432/smart_server_dev```
into the .env file. replace ```USERNAME``` with the name that appears before the ```=#``` when you do ```psql```

add these two lines too: 

``` PORT=4040
SESSION_SECRET_KEY=ASDFQWERLKJ
```

save and close the ```.env``` file

```npm install```

```npm run init-db``` to construct the database schema. this will most likely clear any data in it.

```npm run seed-db``` to seed the database with some dummy data

```npm start```