const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const User = mongoose.model("users");

module.exports = (app, jsonParser) => {
	app.post("/api/users", jsonParser, requireLogin, async (req, res) => {
		const { room } = req.body;
		try {
			const users = await User.find({
				currentRoom: { $in: [room] }
			});
			if (users) {
				res.send(users);
			}
		} catch (err) {
			console.log(err);
		}
	});

	app.post("/api/users/page/update", jsonParser, requireLogin, async (req, res) => {
		const _id = req.user.id;
		const { newRoom } = req.body;
		/**
		 * ? We want to check user.currentRoom and compare it to currentRoom
		 * ? if same sendback the user without making any changes
		 * ? if diff update user, save in db, and send to front end
		 */
		try {
			const user = await User.findById({ _id });

			if (user) {
				if (user.currentRoom.toLowerCase() !== newRoom.toLowerCase()) {
					const filter = { _id };
					const update = { currentRoom: newRoom };
					const newUser = await User.findOneAndUpdate(filter, update, {
						new: true
					});
					await newUser.save();
					res.send(newUser);
				} else {
					res.send(user);
				}
			}
		} catch (err) {
			res.status(400).send(err);
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
			res.status(400).send(err);
		}
	});
};
