const mongoose = require('mongoose');
const chalk = require('chalk');
const requireLogin = require('../middlewares/requireLogin');
const Activity = mongoose.model('activities');
const ActivityInstance = mongoose.model('activityInstance');

module.exports = (app, jsonParser) => {
	app.post(
		'/api/activity/instance',
		jsonParser,
		requireLogin,
		async (req, res) => {
			// we want to check if an AcitivtyInstance with given user.id and activity.id
			// exists in the DB.
			ActivityInstance.count({ _id: '' }, async function (err, count) {
				if (count == 0) {
					console.log(
						chalk.redBright(
							'No activity instance exists with the given user and activity'
						)
					);
				} else if (count > 1) {
					console.log(
						chalk.redBright(
							'Error! Duplicate activity instance found!'
						)
					);
				} else if (count == 1) {
					try {
						const activityInstance = await ActivityInstance.find({
							_user: req.body.user._id,
							_activity: req.body.activity._id
						});
						res.send(activityInstance);
					} catch (err) {
						res.status(512).send(err);
					}
				}
			});

			// the given ActivityInstance DNE, make a new one

			// Math.floor(Date.now() / 1000)

			const activityInstance = new ActivityInstance({
				_user: req.body.user._id,
				_activity: req.body.activity._id,
				minutes: 0,
				hours: 0,
				startTime: 0
			});

			try {
				await activityInstance.save();
				res.send(activityInstance);
			} catch (err) {
				res.status(512).send(err);
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
				_users: [req.user.id]
			});

			try {
				await activity.save();
				res.send(activity);
			} catch (err) {
				res.status(522).send(err);
			}
		}
	);
};
