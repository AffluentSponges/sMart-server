require('dotenv').config();
const express = require('express');
const db = require('./db/db');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// var router = require('./routes');
// var passport = require('./server/passport');

//use .env for port number
const port = process.env.port || 4040;
const app = express();

app.use(morgan('combined'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(require('express-session')({ secret: 'so smart of you', resave: true, saveUninitialized: true }));

// app.use(passport.initialize());
// app.use(passport.session());

// app.use('', router);

app.listen(port, () => {
  console.log('listening on port ' + port);
});

module.exports = app;