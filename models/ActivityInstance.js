const mongoose = require("mongoose");
const { Schema } = mongoose;

const acitivtyInstanceSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "users"
	},
	activity: {
		type: Schema.Types.ObjectId,
		ref: "activities"
	},
	title: String,
	description: String,
	minutes: { type: Number, min: 0, default: 0 },
});

mongoose.model("activityInstance", acitivtyInstanceSchema);
