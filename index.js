const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
// google authentication stuff

require('./models/User');
require('./services/passport');

// connect to mongo db
mongoose.connect(
	keys.MONGO_URI,
	{ useNewUrlParser: true },
	{ useUnifiedTopology: true }
);

// create our express function and app routes
const app = express();
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
