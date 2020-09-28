const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const Activity = mongoose.model('activities');

module.exports = (app) => {
	app.post('/api/activities', requireLogin, (req, res) => {
        console.log(req.body)
        const newTitle = req.body.title;

        // check to see if user has any activities with same name


        
        const activity = new Activity({
            title,
            dateCreated: Date.now()
            //_users: [req.user.id]
        });
	});
};
