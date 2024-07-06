const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api', // Your backend routes that start with /api
        createProxyMiddleware({
            target: 'http://backend:8080', // Your backend server URL
            changeOrigin: true,
        })
    );
};