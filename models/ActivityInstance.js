const mongoose = require('mongoose');
const { Schema } = mongoose;


const acitivtyInstanceSchema = new Schema({
	user: String,
	activityTitle: String,
	minutes: { type: Number, min: 0, max: 60, default: 0 },
	hours: { type: Number, default: 0 },
    startTime: Number
});

mongoose.model('activityInstance', acitivtyInstanceSchema)
