const passport = require('passport');

module.exports = (app) => {
	app.get(
		'/auth/google',
		passport.authenticate('google', {
			scope: ['profile', 'email']
		})
	);

	// note: passport.authenticate is a middleware
	// it's a function that takes the incoming request
	// and authenticates  the user, after which it passes the request
	// onto the next middleware in our app.
	app.get(
		'/auth/google/callback',
		passport.authenticate('google'),
		// this is where the request will be sent to after passport.authenticate()
		(req, res) => {
			res.redirect('/activities');
		}
	);

	app.get('/api/logout', (req, res) => {
		// the logout funcion is attached automatically to the req object by passport.
		// when we call logout() it takes the cookie containing our user.id and KILLS the
		// cookie.
		req.logout();
		// send the user proof that they are no longer logged in
		//res.send(req.user);

		res.redirect('/');
	});

	app.get('/api/current_user', (req, res) => {
		// req.session contains the data postport is attempting to store in our cookie
		// res.send(req.session);
		res.send(req.user);
	});
};
