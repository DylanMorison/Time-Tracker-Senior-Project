const mongoose = require('mongoose');
const chalk = require('chalk');
const requireLogin = require('../middlewares/requireLogin');
const Activity = mongoose.model('activities');
const ActivityInstance = mongoose.model('activityInstance');

module.exports = (app, jsonParser) => {
	app.put('/api/activity/instance/update', jsonParser, async (req, res) => {
		const user = req.user.id;
		const activity = req.body.activity;
		const { minutes, title, description } = req.body;

		const filter = { user, activity, title, description };
		const update = { minutes };

		const activityInstance = await ActivityInstance.findOneAndUpdate(
			filter,
			update,
			{ new: true }
		);

		if (activityInstance !== null) {
			console.log(activityInstance);
			activityInstance.save();
		}

		try {
			res.send(activityInstance);
		} catch (err) {
			res.status(400).send(err);
		}
	});

	app.post(
		'/api/activity/instance',
		jsonParser,
		requireLogin,
		async (req, res) => {
			const user = req.user.id;
			const activity = req.body._id;
			const { title, description } = req.body;
			try {
				let activityInstance = await ActivityInstance.findOne({
					user,
					activity
				});

				if (activityInstance) {
					res.send(activityInstance);
					return;
				}

				activityInstance = await new ActivityInstance({
					user,
					activity,
					title,
					description,
					minutes: 0
				}).save();

				res.send(activityInstance);
			} catch (err) {
				res.status(500).send('Server error');
			}
		}
	);

	app.get('/api/activities', jsonParser, requireLogin, async (req, res) => {
		// to get current user : req.user
		const activities = await Activity.find({});
		res.send(activities);
	});

	app.post(
		'/api/activities/new',
		jsonParser,
		requireLogin,
		async (req, res) => {
			const { title, description } = req.body;

			const activity = new Activity({
				title,
				description,
				dateCreated: Date.now(),
				user: [req.user.id]
			});
			try {
				await activity.save();
				res.send(activity);
			} catch (err) {
				res.status(500).send(err);
			}
		}
	);
};
