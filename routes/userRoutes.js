const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const Activity = mongoose.model("activities");
const User = mongoose.model("users");

module.exports = (app, jsonParser) => {
	app.put("/api/activity/user/count", jsonParser, requireLogin, async (req, res) => {
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
	});

	app.put("/api/users/username/change", jsonParser, requireLogin, async (req, res) => {
		try {
			const _id = req.user.id;
			const { username } = req.body;

			const filter = { _id };
			const update = { username };

			const newUser = await User.findOneAndUpdate(filter, update, { new: true });

			if (newUser) {
				await newUser.save();
				res.send(newUser);
			}
		} catch (err) {
			console.err(err.msg);
		}
	});
};
