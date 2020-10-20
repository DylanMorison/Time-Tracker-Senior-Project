const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const Activity = mongoose.model('activities');

module.exports = (app, jsonParser) => {
	app.put(
		'/api/activity/user/count',
		jsonParser,
		requireLogin,
		async (req, res) => {
			const user = req.user.id;
			const { title, description } = req.body;
			const filter = { user, title, description };
			let userCount = 0;
			try {
				const activities = await Activity.find({ title });

				const update = { userCount: activities.length };

				await Activity.findOneAndUpdate(filter, update);
			} catch (error) {
				console.error(error.msg);
			}
		}
	);
};
