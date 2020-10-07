// this is mongoose model class used to define mongodb Users Collection
const mongoose = require('mongoose');
const ActivitySchema = require('./Activity');
// take property Schema and apply it to variable: Schema
// const Schema = mongoose.Schema;
// or destructure it
const { Schema } = mongoose;

const userSchema = new Schema({
	googleID: String,
	username: String,
});

// Hello mongoose, I want to make a new collection called 'users'
// if our app boots up and theres already a users collection mongoose
// will make sure userSchema matches up with our db users collection
mongoose.model('users', userSchema);
module.exports = userSchema;
