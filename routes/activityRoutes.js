const mongoose = require("mongoose");
const chalk = require("chalk");
const requireLogin = require("../middlewares/requireLogin");
const Activity = mongoose.model("activities");
const ActivityInstance = mongoose.model("activityInstance");
const User = mongoose.model("users");
const Goal = mongoose.model("goals");

module.exports = (app, jsonParser) => {
	app.put("/api/activity/user/count", jsonParser, requireLogin, async (req, res) => {
		const user = req.user.id;
		const { title } = req.body;
		// this should be the number of users in the room!
		try {
			const users = await User.find({ currentRoom: { $in: [title] } });
			const userCount = users.length;
			const update = { userCount };
			const filter = { title };
			await Activity.updateMany(filter, update);
		} catch (error) {
			console.error(error.msg);
		}
	});

	app.put("/api/activity/instance/update", jsonParser, async (req, res) => {
		debugger;
		const user = req.user.id;
		const activity = req.body.activity;
		const { minutes, title, description, currentMinutes, _id } = req.body;

		const filter = { user, activity, title, description };
		const update = { minutes };

		const activityInstance = await ActivityInstance.findOneAndUpdate(filter, update, {
			new: true
		});

		if (activityInstance !== null) {
			activityInstance.save();
			const filter = { user, activityInstance: _id };
			const update = { currentMinutes: parseInt(currentMinutes) };
			await Goal.findOneAndUpdate(filter, update, (err) => {
				if (err) {
					console.log(err);
				}
			});
		}

		try {
			res.send(activityInstance);
		} catch (err) {
			res.status(400).send(err);
		}
	});

	app.post("/api/activity/instance", jsonParser, requireLogin, async (req, res) => {
		const user = req.user.id;
		const activity = req.body._id;
		const { title, description, subject, userCount } = req.body;
		try {
			const activities = await Activity.find({ title: { $in: [title] } });
			const userCount = activities.length;

			const update = { userCount };
			const filter = { user, title, description };
			await Activity.findOneAndUpdate(filter, update);

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
			res.status(500).send("Server error");
		}
	});

	app.get("/api/activity/instances", jsonParser, requireLogin, async (req, res) => {
		const user = req.user.id;
		const activities_instances = await ActivityInstance.find({ user });
		if (activities_instances) {
			res.send(activities_instances);
		}
	});

	app.get("/api/activities", jsonParser, requireLogin, async (req, res) => {
		// to get current user : req.user
		const activities = await Activity.find({});
		res.send(activities);
	});

	app.get("/api/activities/public", jsonParser, requireLogin, async (req, res) => {
		// to get current user : req.user
		const activities = await Activity.find({});
		res.send(activities);
	});

	app.get("/api/activities/private", jsonParser, requireLogin, async (req, res) => {
		const user = req.user;
		const activities = await Activity.find({ user });
		res.send(activities);
	});

	app.post("/api/activities/new", jsonParser, requireLogin, async (req, res) => {
		const { title, description, subject } = req.body;
		const user = req.user;
		try {
			let activity = await Activity.findOne({ title, user, description, subject });
			if (activity) {
				res.send(activity);
				return;
			}
			activity = await new Activity({
				title,
				user,
				description,
				subject
			});
			await activity.save();
			res.send(activity);
		} catch (err) {
			res.status(500).send(err);
		}
	});
};
