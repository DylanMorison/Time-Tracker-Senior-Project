const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const http = require("http");
const socketio = require("socket.io");

require("./models/User");
require("./models/Activity");
require("./models/ActivityInstance");
require("./services/passport");

mongoose.Promise = global.Promise;

// connect to mongo db
mongoose.connect(keys.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false
});

const app = express();

const server = http.createServer(app);

const io = socketio(server);

const getApiAndEmit = socket => {
	const response = new Date();
	// Emitting a new message. Will be consumed by the client
	socket.emit("FromAPI", response);
  };

let interval;

io.on("connection", (socket) => {
	console.log("New client connected");
	if (interval) {
		clearInterval(interval);
	}
	interval = setInterval(() => getApiAndEmit(socket), 1000);
	socket.on("disconnected", () => {
		console.log("Client disconnected");
		clearInterval(interval);
	});
});

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);

app.use(passport.initialize());
app.use(passport.session());

const jsonParser = bodyParser.json();

require("./routes/authRoutes")(app);
require("./routes/activityRoutes")(app, jsonParser);
require("./routes/userRoutes")(app, jsonParser);

// process.env.NODE_ENV is an envirement variable automatically set by heroku
if (process.env.NODE_ENV === "production") {
	// Express will serve up production assets
	// like our main.js file, or main.css file
	app.use(express.static("client/build"));

	// Express will serve up the index.html file if it doesn't recognise the route
	const path = require("path");
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

const PORT = process.env.PORT || 5000;

server.listen(PORT);
