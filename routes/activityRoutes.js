const mongoose = require('mongoose');
const chalk = require('chalk');
const requireLogin = require('../middlewares/requireLogin');
const Activity = mongoose.model('activities');
const ActivityInstance = mongoose.model('activityInstance');

// const findActivityInstance = async (user, activityTitle) => {
// 	await ActivityInstance.findOne({ user, activityTitle }, function (
// 		err,
// 		activityInstance
// 	) {
// 		if (err) {
// 			console.log(chalk.greenBright('Hello Dylan'), err);
// 		}
// 		return activityInstance;
// 	});
// };

module.exports = (app, jsonParser) => {
	app.put('/api/activity/instance/update', jsonParser, async (req, res) => {
		const user = req.user.id;
		const { activityTitle, minutes } = req.body;
		const minutesInt = parseInt(minutes);

		const filter = { activityTitle, user };
		const update = { minutes: minutesInt };
		const activityInstance = await ActivityInstance.findOneAndUpdate(
			filter,
			update,
			{ new: true }
		);

		if (activityInstance !== null) {
			console.log(activityInstance);
			activityInstance.save();
		}

		try{
			res.send(activityInstance);
		} catch (err){
			res.status(400).send(err);
		}
	});

	app.post(
		'/api/activity/instance',
		jsonParser,
		requireLogin,
		async (req, res) => {
			let activityInstance;
			const user = req.user.id;
			const activityTitle = req.body.title;

			activityInstance = await new ActivityInstance({
				user,
				activityTitle,
				minutes: 0,
				startTime: 0
			}).save(async function (err) {
				if (err) {
					if (err.name === 'MongoError' && err.code === 11000) {
						activityInstance = await ActivityInstance.findOne(
							{ user, activityTitle },
							function (err, activityInstance) {
								if (err) {
									console.log(
										chalk.greenBright('Hello Dylan'),
										err
									);
								}
								try {
									res.send(activityInstance);
								} catch (err) {
									res.status(400).send(err);
								}
							}
						);
					}
				}
			});
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
