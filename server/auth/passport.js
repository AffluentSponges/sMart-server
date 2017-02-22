const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('../db/db');
const config = require('./config').authConfig;
const checkUser = require('./config').checkConfig;

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

passport.use(new GoogleStrategy(GoogleConfig, checkUser.checkConfig));
