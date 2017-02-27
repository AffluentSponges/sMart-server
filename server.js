require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const passportAuth = require('./server/auth/passport');
const router = require('./server/routes');
require('./server/models')

//use .env for port number
const port = process.env.PORT || 3000;
const app = express();

passportAuth(passport);

// if (process.env.NODE_ENV !== 'test') {
//   app.use(morgan('combined'));
// }

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SESSION_SECRET_KEY || 'nothing is secret',
  resave: false,
  saveUninitialized: true,
  store: new (require('connect-pg-simple')(session))(),
  cookie : { maxAge:  30 * 24 * 60 * 60 * 1000 } // this means 30days
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/client/public'));

app.use('', router);

app.listen(port, () => {
  console.log('listening on port ' + port);
});

module.exports = app;