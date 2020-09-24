const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./models/User');
require('./services/passport');

// connect to mongo db
mongoose.connect(
	keys.MONGO_URI,
	{ useNewUrlParser: true },
	{ useUnifiedTopology: true }
);

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

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
