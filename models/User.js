const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	googleID: String,
	username: String,
});

mongoose.model('users', userSchema);
