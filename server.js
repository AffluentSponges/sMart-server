require('dotenv').config();
var express = require('express');
var db = require('./db/db')
// var router = require('./routes');
// var passport = require('./server/passport');

//use .env for port number
var port = 4040;

var app = express();


app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
// app.use(require('express-session')({ secret: 'so smart of you', resave: true, saveUninitialized: true }));

// app.use(passport.initialize());
// app.use(passport.session());

// app.use('', router);

app.listen(port, () => {
  console.log('listening on port ', port);
});

module.exports = app;