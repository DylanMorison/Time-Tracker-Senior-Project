const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// one argument in mongoose.model means we are trying to pull a schema/model
// out of mongoose
// two arguments means we are trying to load something into mongoose.

// This User object is our model class
// we can use it to create a new instance of a user
const User = mongoose.model('users');

// define arrow function and pass it to passport.serializeUser()
passport.serializeUser((user, done) => {
	//user.id will identify the user in follow up requests
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	// search over all our collection
	// call done with returned user
	User.findById(id).then((user) => {
		done(null, user);
	});
});

// passport beware of the new strategy: GoogleStrategy
passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
			proxy: true
		},
		(accessToken, refreshToken, profile, done) => {
			// look through users collection and find the first
			// user document where googleID === profile.id
			// Anytime we reach out to our mongo DB for anyone reason we are
			// Initiating an async action. It will consequently return a promise.

			// ( TL:DR This is a query that returns a promise)
			User.findOne({ googleID: profile.id }).then((existingUser) => {
				if (existingUser) {
					// we already have a record with given googleID
					// we are all finsihed, here is the user we found!
					done(null, existingUser);
				} else {
					// we dont have user record with this googleID, make a new record
					//when we call save() it will save the model isntance to the database for us
					new User({ googleID: profile.id })
						.save()
						// second instance of same model
						// but we always make use of the one provided
						// in the proimse callback
						.then((user) => done(null, user));
				}
			});
		}
	)
);
