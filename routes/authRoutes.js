const passport = require('passport');

module.exports = (app) => {
	app.get(
		'/auth/google',
		passport.authenticate('google', {
			scope: ['profile', 'email']
		})
	);

	app.get('/auth/google/callback', passport.authenticate('google'));

	app.get('/api/logout', (req, res) => {
		// the logout funcion is attached automatically to the req object by passport.
		// when we call logout() it takes the cookie containing our user.id and KILLS the 
		// cookie.
		req.logout();
		// send the user proof that they are no longer logged in
		res.send(req.user);
	});

	app.get('/api/current_user', (req, res) => {
		// req.session contains the data postport is attempting to store in our cookie
		// res.send(req.session);
		res.send(req.user);
	});
};
