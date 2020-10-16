const mongoose = require('mongoose');
const { Schema } = mongoose;

const acitivtyInstanceSchema = new Schema({
	user: String,
	activityTitle: String,
	minutes: { type: Number, min: 0, default: 0 },
});

mongoose.model('activityInstance', acitivtyInstanceSchema);
