require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('../db/db');
const passport = require('passport');

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        // console.log('SERIALIZED', user);
        done(null, user);
    });
    passport.deserializeUser((id, done) => {
        db.User.where({ googleID: id.googleID }).fetch()
        .then((user) => { 
            // console.log('DESERIALIZED', user)
            done(null, user);
        })
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
                    googleID: profile.id,
                    token: profile.token,
                    username: profile.emails[0].value.split('@')[0],
                    first_name: profile.displayName.split(' ')[0],
                    last_name: profile.displayName.split(' ')[1],
                    email: profile.emails[0].value
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
