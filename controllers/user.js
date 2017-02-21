const db = require('../db/db');

var controller = {};

controller.register.post = function(req, res) {
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	// If username or password left blank, send back 400: Bad request
	if (errors) {
		res.sendStatus(400);

	} else {
		// Check database for supplied username
		db.User.findAll({
			where: { username: username }
			})
			.then(function(users) {

			// Username is free; hash password
			if (users.length === 0) {
				bcrypt.hash(password, saltRounds, function(err, hash) {
				  if (err) {
				    console.log('Error hashing password', err);
				  } else {

				    // Add new user to database
				    db.User.create({
				      username: username,
				      password: hash
				    })

				    // Create session and send back 201: Created code
				    .then(function(user) {
				      util.createSession(req, res, user);
				    });
				  }
				});

			// Username is already in db; compare supplied password to pw in db
			} else {
				bcrypt.compare(password, users[0].dataValues.password, function(err, comparison) {
					if (err) {
						console.log('Error in password comparison', err);
					}

					// Supplied password matches, user already has account; send to Signin page
					if (comparison === true) {
						res.sendStatus(204);
					// Supplied pw doesn't match; probably new user & should choose another username
					} else {
						res.sendStatus(401);
					}
				});
			}
		});
	}
};

module.exports = controller;

