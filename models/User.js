const mongoose = require("mongoose");
const { Schema } = mongoose;
var validate = require("mongoose-validator");

var nameValidator = [
	validate({
		validator: "isLength",
		arguments: [3, 20],
		message: "Name should be between 3 and 50 characters"
	})
];

const userSchema = new Schema({
	googleID: String,
	username: { type: String, required: true, validate: nameValidator }
});

mongoose.model("users", userSchema);
