const { createProxyMiddleware } = require('http-proxy-middleware');  //注意写法，这是1.0以后的版本，最好按抄

module.exports = function (app) {
    app.use(createProxyMiddleware('/juheapi',
        {
            target: 'http://apis.juhe.cn',
            pathRewrite: {
                '^/juheapi': '',
            },
            changeOrigin: true,
        }
    ));

    app.use(createProxyMiddleware('/qqapi',
        {
            target: 'https://view.inews.qq.com/',
            pathRewrite: {
                '^/qqapi': '',
            },
            changeOrigin: true,
        }
    ));
};