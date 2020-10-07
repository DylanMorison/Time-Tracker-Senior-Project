const mongoose = require('mongoose');
const { Schema } = mongoose;

const acitivtyInstanceSchema = new Schema({
	_user: { type: Schema.Types.ObjectId, ref: 'users' },
	_activity: { type: Schema.Types.ObjectId, ref: 'activities' },
	minutes: { type: Number, min: 0, max: 60, default: 0 },
	hours: { type: Number, default: 0 },
    currentSessionElapsed: Number
});

mongoose.model('activityInstance', acitivtyInstanceSchema)
