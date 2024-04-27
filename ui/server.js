require('dotenv').config();

const express = require('express');

const {
    createProxyMiddleware
} = require('http-proxy-middleware');


const app = express();
app.use(express.static('public'));

const PORT = process.env.UI_SERVER_PORT || 8000;
const API_PROXY_TARGET = process.env.API_PROXY_TARGET || 'http://localhost:3000';

app.use('/graphql', createProxyMiddleware({
    target: API_PROXY_TARGET,
    changeOrigin: true
}));


app.listen(PORT, function () {
    console.log(`UI started on port ${PORT} \nUI Link: http://localhost:${PORT}/`);
});