const mongoose = require('mongoose');
const chalk = require('chalk');
const requireLogin = require('../middlewares/requireLogin');
const Activity = mongoose.model('activities');

module.exports = (app, jsonParser) => {
	app.post('/api/activities/new', jsonParser, requireLogin, async (req, res) => {
		console.log(chalk.redBright('LOOK HERE! req'), req.body);
		const { title, description } = req.body;

		const activity = new Activity({
			title,
			description,
			dateCreated: Date.now(),
			minutes: 0,
			hours: 0,
			_users: [req.user.id]
		});
		
		try {
			await activity.save();
			res.send(activity);
		} catch (err) {
			res.status(422).send(err);
		}
	});
};
