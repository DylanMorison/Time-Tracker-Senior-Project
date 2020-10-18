const mongoose = require('mongoose');
const { Schema } = mongoose;

const activitySchema = new Schema({
	title: { type: String, lowercase: true },
	description: String,
	dateCreated: { type: Date, default: Date.now() },
	users: [
		{
			type: Schema.Types.ObjectId,
			ref: 'users'
		}
	]
});
mongoose.model('activities', activitySchema);
