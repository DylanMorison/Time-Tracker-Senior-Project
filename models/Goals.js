const mongoose = require("mongoose");
const { Schema } = mongoose;

const GoalSchema = new Schema({
	ActivityInstance: {
		type: Schema.Types.ObjectId,
		ref: "activityInstance"
	},
	minutesToday: Number,
	minutesThisWeek: Number,
	dayGoal: Number,
	WeeklyGoal: Number
});

mongoose.Mongoose.model("Goals", GoalSchema);
