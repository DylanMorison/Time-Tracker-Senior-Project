const mongoose = require('mongoose');
const { Schema } = mongoose;

const activitySchema = new Schema({
	title: { type: String, lowercase: true },
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	description: String,
	subject: String,
	dateCreated: { type: Date, default: Date.now() },
	userCount: { type: Number, default: 0 },
	favorite: { type: Boolean, default: false }
});
mongoose.model('activities', activitySchema);
