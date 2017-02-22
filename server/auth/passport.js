const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('../db/db');
const config = require('./config').authConfig;
const checkUser = require('./config').checkConfig;
const passport = require('passport');

module.exports = (passport) => {
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});
	passport.deserializeUser((id, done) => {
		db.User.findOne({
			where: { id: user.id }
		})
		.then((user) => { done(null, user); })
		.catch((err) => { done(err,null); });
	});
};

const GoogleConfig = {
	clientID: config.clientID,
	clientSecret: config.clientSecret,
	callbackURL: config.callbackURL
}

passport.use(new GoogleStrategy(GoogleConfig, function(token, refreshToken, profile, done) {
	console.log('PROFILE', profile);

      process.nextTick(function() {

          db.User.where({ 'email' : profile.emails[0].value })
          .fetch()
          .then(function(user) {
          	console.log('USER', user)
              if (user) {
                console.log('USER FOUND');
                  return done(null, user);
              } else {
                console.log('USER NOT FOUND: CREATING');
                new db.User({
                  username: profile.emails[0].value.split('@')[0],
                  first_name: profile.displayName.split(' ')[0],
                  last_name: profile.displayName.split(' ')[1],
                  email: profile.emails[0].value,
                })
                .save()
                .then(function(user) {
                  return done(null, user);
                })
                .catch(function(err) {
                  console.log(err);
                });
              }
          })
          .error(function(err) {
            return done(err);
          });
      });

  }));
