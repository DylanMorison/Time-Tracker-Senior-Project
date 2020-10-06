const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const Activity = mongoose.model('activities');

module.exports = (app) => {
	// a get request to get all activities present in the database
	app.get('/api/activities', requireLogin, async (req, res) => {
		_userID = req.user.id;
		const activities = await Activity.find({ _user: req.user.id });

		const activity = new Activity({
			title,
			dateCreated: Date.now()
			//_users: [req.user.id]
		});

		try {
			await activity.save();
			const user = await req.user.save();
			res.send(user);
		} catch (err) {
			res.status(422).send(err);
		}
	});

	app.post('/api/activities/new', requireLogin, async (req, res) => {
		const activity = await new Activity({
			title: req.body.title,
			_users: [req.user.id]
        }).save();

        req.user.activities.push(activity);
        const user = await req.user.save();
        res.send(user);
        

		// const user = await new User({ googleID: profile.id }).save();
	});
};
