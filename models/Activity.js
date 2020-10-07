const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema = require('./User');

const activitySchema = new Schema({
	title: { type: String, unique: true, lowercase: true },
	description: String,
	dateCreated: { type: Date, default: Date.now() },
	minutes: { type: Number, min: 0, max: 60, default: 0 },
	hours: { type: Number, default: 0 },
	_users: [UserSchema]
});
mongoose.model('activities', activitySchema);
