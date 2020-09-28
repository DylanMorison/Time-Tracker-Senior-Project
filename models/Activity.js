const mongoose = require('mongoose');
const { Schema } = mongoose;

const activitySchema = new Schema({
	title: { type: String, unique: true, lowercase: true },
	dateCreated: { type: Date, default: Date.now() },
	minutes: { type: Number, min: 0, max: 60 },
	hours: { type: Number },
	_users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});
mongoose.model('activities', activitySchema);
module.exports = activitySchema;
