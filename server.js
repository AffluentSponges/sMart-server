require('dotenv').config();
const express = require('express');
const db = require('./server/db/db');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const passportAuth = require('./server/auth/passport');
var router = require('./server/routes');

//use .env for port number
const port = process.env.PORT || 3000;
const app = express();

app.use(morgan('combined'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
passportAuth(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: true
}));

app.use(express.static(__dirname + '/client/public'));

app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get('/auth/google/callback',
	passport.authenticate('google', {
    	successRedirect : '/',
    	failureRedirect : '/login'
	})
);

app.get('/logout', function(req, res) {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});



app.use('', router);

app.listen(port, () => {
  console.log('listening on port ' + port);
});

module.exports = app;