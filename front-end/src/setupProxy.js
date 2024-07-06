import { createProxyMiddleware } from 'http-proxy-middleware';

const target = process.env.REACT_APP_BACKEND_API || "http://localhost:8080"

export default function(app) {
    console.log(app);
    app.use(
        '/api',
        createProxyMiddleware({
            target: target,
            changeOrigin: true,
        })
    );
};