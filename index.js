const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const http = require("http");
const socketio = require("socket.io");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./utils/users_io");

require("./models/User");
require("./models/Activity");
require("./models/ActivityInstance");
require("./models/Goal");

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

/**
 * @param connection: Whenever a new user connects io.on("connection", () => {}) is run
 * @param socket: An oject that contains information about a new connection
 */

io.on("connection", (socket) => {
	/**
	 * @param socket.emit: emits to connection instancec
	 * @param socket.broadcast.emit: emits to everyone but current connection instance
	 * @param io.emit: emits to all connections
	 * @param io.to.emit: emits to everyone in a specific room
	 * @param socket.broadcast.to.emit: sends messages to every client limited to a room
	 * @param socket.join: ?
	 */

	console.log("New Websocket connection!");

	socket.emit("message", "Welcome New User!");

	socket.on("joinCurrentPage", (user_id, username, currentPage) => {
		debugger;
		const { error, user } = addUser({ id: user_id, username, room: currentPage });

		if (error) {
			console.log(error);
		}

		socket.join(user.room);
		console.log(getUsersInRoom(user.room));
		socket.broadcast.to(user.room).emit("roomData", {
			room: user.room,
			users: getUsersInRoom(user.room)
		});
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
require("./routes/goalRoutes")(app, jsonParser);

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
