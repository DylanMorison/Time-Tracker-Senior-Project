const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
require('./models/User');
require('./models/Activity');
require('./models/ActivityInstance');
require('./services/passport');

mongoose.Promise = global.Promise;

// connect to mongo db
mongoose.connect(keys.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true, 
	useCreateIndex: true
});

const app = express();

// each of these app.use calls wire up middleware inside our app.
// middleware are small functions that can be used to modify incoming requests
// to our app BEFORE they are sent to the route handlers in routes/authRoutes.js

// Example: we might want to authenticate every single request that comes to our app
// so we can wire up our middleware here and do just that.

// What if we dont want to run these middlewares every single time?
// We can set up route handlrs that are not run by them.

app.use(
	// wtf is this cookieSession?
	// we implement cookieSession
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);

app.use(passport.initialize());
app.use(passport.session());

const jsonParser = bodyParser.json();

require('./routes/authRoutes')(app);
require('./routes/activityRoutes')(app, jsonParser);

// process.env.NODE_ENV is an envirement variable automatically set by heroku
if (process.env.NODE_ENV === 'production') {
	// Express will serve up production assets
	// like our main.js file, or main.css file
	app.use(express.static('client/build'));

	// Express will serve up the index.html file if it doesn't recognise the route
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
