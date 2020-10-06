const mongoose = require('mongoose');
const { Schema } = mongoose;

const activitySchema = new Schema({
	title: { type: String, unique: true, lowercase: true },
	description: String,
	dateCreated: { type: Date, default: Date.now() },
	minutes: { type: Number, min: 0, max: 60, default: 0 },
	hours: { type: Number, default: 0 },
	_users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});
mongoose.model('activities', activitySchema);
module.exports = activitySchema;
