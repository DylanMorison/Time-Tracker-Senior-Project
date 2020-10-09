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
			var activityInstance = null;
			const user = req.user.id;
			const activityTitle = req.body.title;

			await ActivityInstance.findOne({ user, activityTitle }, function (
				err,
				data
			) {
				if (err) {
					console.log(err);
				}
				console.log(chalk.redBright(activityInstance));
				debugger;
				activityInstance = data;
				console.log(chalk.greenBright('______________'));
				console.log(chalk.redBright(activityInstance));
			});

			if (activityInstance === null) {
				activityInstance = await new ActivityInstance({
					user,
					activityTitle,
					minutes: 0,
					hours: 0,
					startTime: 0
				}).save();
			}

			try {
				res.send(activityInstance);
			} catch (err) {
				res.status(500).send(err);
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
				_user: req.user.id
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
