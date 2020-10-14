const mongoose = require('mongoose');
const { Schema } = mongoose;

const acitivtyInstanceSchema = new Schema({
	user: String,
	activityTitle: { type: String, unique: true },
	minutes: { type: Number, min: 0, default: 0 },
});

mongoose.model('activityInstance', acitivtyInstanceSchema);
