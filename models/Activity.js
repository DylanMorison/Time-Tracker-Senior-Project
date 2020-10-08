const mongoose = require('mongoose');
const { Schema } = mongoose;

const activitySchema = new Schema({
	title: { type: String, lowercase: true },
	description: String,
	dateCreated: { type: Date, default: Date.now() },
	_user: [String]
});
mongoose.model('activities', activitySchema);
module.exports = activitySchema;