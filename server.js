require('dotenv').config();
const express = require('express');
const db = require('./server/db/db');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const FileStore = require('session-file-store')(session);
const passportAuth = require('./server/auth/passport');
const router = require('./server/routes');

//use .env for port number
const port = process.env.PORT || 3000;
const app = express();

passportAuth(passport);
app.use(morgan('combined'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  store: new FileStore(),
  cookie : { maxAge: 2419200000 }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/client/public'));

app.use('', router);

app.listen(port, () => {
  console.log('listening on port ' + port);
});

module.exports = app;