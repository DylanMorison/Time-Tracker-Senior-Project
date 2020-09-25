const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
	app.use(
        // in production, when deployed to heroku  
		['/api', '/auth/google'],
		createProxyMiddleware({
			target: 'http://localhost:5000'
		})
	);
};
