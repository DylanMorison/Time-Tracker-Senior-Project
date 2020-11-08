const { json } = require("body-parser");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const ActivityInstance = mongoose.model("activityInstance");
const User = mongoose.model("users");
const Goal = mongoose.model("goals");

module.exports = (app, jsonParser) => {
	app.post("/api/goals/create", jsonParser, requireLogin, async (req, res) => {
		debugger;

		const user = req.user.id;
		const { _id, title } = req.body;
		let goal;

		try {
			const activityInstance = await ActivityInstance.findById({ _id });
			if (activityInstance) {
				goal = await Goal.findOne({ user, activityInstance });
				if (goal) {
					res.send(goal);
					return;
				}
			}

			goal = await new Goal({
				user,
				activityInstance,
				title
			}).save();

			const goals = await Goal.find({ user });
			if (goals.length > 0) {
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
};
