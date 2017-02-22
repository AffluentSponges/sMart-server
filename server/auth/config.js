module.exports = {
	authConfig: {
		"clientID"      : "324158594750-dqvh1epu3dvo5hbk74ib6hrr745km4ic.apps.googleusercontent.com",
		"clientSecret"  : "n7hwAPOxteRp11FKNtxyzYF-",
		"callbackURL"   : "http://localhost:3000/auth/google/callback"
	},
	checkConfig: function(token, refreshToken, profile, done) {
	    // make the code asynchronous
	    // User.findOne won't fire until we have all our data back from Google
	    process.nextTick(function() {
		    // try to find the user based on their google id
		    db.User.findOne({where: { 'id' : profile.id }})
		    .then(function(user) {
		    	if (user) {
		            console.log('USER FOUND');
		            // if a user is found, log them in
		            return done(null, user);
		        } else {
		        console.log('USER NOT FOUND: CREATING');

		            db.User.build({
		            	// set all of the relevant information
		            	id: profile.id,
		            	token: token,
		            	name: profile.displayName,
		            	email: profile.emails[0].value // pull the first email
		          	})
		            // save the user
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
	}
};