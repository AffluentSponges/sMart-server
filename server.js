require('dotenv').config();
const express = require('express');
const db = require('./db/db');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

// var router = require('./routes');
// var passport = require('./server/passport');

//use .env for port number
const port = process.env.port || 4040;
const app = express();

app.use(morgan('combined'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(path.join(__dirname, '..', '..', 'client')));

app.listen(port, () => {
  console.log('listening on port ' + port);
});

module.exports = app;