require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('../db/db');
const passport = require('passport');

// module.exports = (passport) => {
// 	passport.serializeUser((user, done) => {
// 		done(null, user.id);
// 	});
// 	passport.deserializeUser((id, done) => {
// 		db.User.findOne({
// 			where: { id: user.id }
// 		})
// 		.then((user) => { done(null, user); })
// 		.catch((err) => { done(err,null); });
// 	});
// };

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        db.User.where({ id: user.id }).fetch()
        .then((user) => { done(null, user); })
        .catch((err) => { done(err,null); });
    });
};

const GoogleConfig = {
	clientID: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	callbackURL: process.env.GOOGLE_CB_URL
};

passport.use(new GoogleStrategy(GoogleConfig, function(token, refreshToken, profile, done) {
    process.nextTick(function() {

        db.User.where({ 'email' : profile.emails[0].value })
        .fetch()
        .then(function(user) {
            if (user) {
                return done(null, user);
            } else {
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
