const { json } = require("body-parser");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const ActivityInstance = mongoose.model("activityInstance");
const User = mongoose.model("users");
const Goal = mongoose.model("goals");

module.exports = (app, jsonParser) => {
	app.post("/api/goals/create", jsonParser, requireLogin, async (req, res) => {
		const user = req.user.id;
		const { _id, title, minuteGoal, instanceTitle } = req.body;
		let goal;
		try {
			const activityInstance = await ActivityInstance.findById({ _id });
			if (activityInstance) {
				goal = await Goal.findOne({
					user,
					activityInstance,
					instanceTitle
				});
				if (goal) {
					return;
				}
				goal = await new Goal({
					user,
					activityInstance,
					title,
					minuteGoal,
					instanceTitle
				}).save();
			}

			const goals = await Goal.find({ user });
			if (goals) {
				res.send(goals);
			}
			return;
		} catch (err) {
			console.log(err);
		}
	});

	app.get("/api/goals", jsonParser, requireLogin, async (req, res) => {
		const user = req.user.id;

		try {
			const goals = await Goal.find({ user });

			if (goals) {
				res.send(goals);
			}
		} catch (err) {
			console.log(err);
		}
	});

	app.post("/api/goals/delete", jsonParser, requireLogin, async (req, res) => {
		const { _id } = req.body;
		const user = req.user.id;

		try {
			await Goal.deleteOne({ _id, user }, async (err) => {
				if (err) return handleError(err);
				const goals = await Goal.find({ user });
				if (goals) {
					res.send(goals);
				}
			});
		} catch (err) {
			console.log(err);
		}
	});
};
