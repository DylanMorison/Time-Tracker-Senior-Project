const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema = require('./User');

const activitySchema = new Schema({
	title: { type: String, unique: true, lowercase: true },
	description: String,
	dateCreated: { type: Date, default: Date.now() },
	_users: [UserSchema]
});
mongoose.model('activities', activitySchema);
