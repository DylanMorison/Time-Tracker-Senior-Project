const mongoose = require("mongoose");
const { Schema } = mongoose;

const GoalSchema = new Schema({
	title: String,
	instanceTitle: String,
	minuteGoal: { type: Number, default: 0 },
	currentMinutes: { type: Number, default: 0 },
	user: { type: Schema.Types.ObjectId, ref: "users" },
	activityInstance: { type: Schema.Types.ObjectId, ref: "activityInstance" }
});


mongoose.model("goals", GoalSchema);
