const { createProxyMiddleware } = require('http-proxy-middleware');

const target = process.env.REACT_APP_BACKEND_API || "http://localhost:8080";
console.log('Proxying to:', target);

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: target,
            changeOrigin: true,
            logLevel: 'debug',
            onProxyReq: (proxyReq, req, res) => {
                console.log('Proxying request:', req.url);
            },
        })
    );
};