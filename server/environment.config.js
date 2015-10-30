var path = require('path');
var isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    isProduction: isProduction,
    configureDevServer: function (app) {

        if (isProduction)
            return;

        var webpack = require('webpack');
        var config = require('../webpack.config');
        var compiler = webpack(config);

        app.use(require('webpack-dev-middleware')(compiler, {
            noInfo: true,
            publicPath: config.output.publicPath
        }));

        app.use(require('webpack-hot-middleware')(compiler));

    }
};