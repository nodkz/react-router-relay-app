var path = require('path');
var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var isProduction = process.env.NODE_ENV === 'production';

var plugins = [
    new CleanPlugin(['dist']),
    new HtmlWebpackPlugin({
        template: './index.html.tmpl'
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: isProduction ? 'vendor.[chunkhash].js' : 'vendor.js',
        minChunks: Infinity
    })
];

if (isProduction) {
    plugins = plugins.concat([
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })]);
} else plugins = plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
]);

module.exports = {
    devtool: 'source-map',
    entry: {
        app: isProduction ? './src/index' : [
            'webpack-hot-middleware/client',
            './src/index'
        ],
        vendor: ['react', 'react-addons-css-transition-group', 'react-dom', 'react-relay', 'react-router', 'react-router-relay', 'history', 'moment', 'moment-duration-format']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: isProduction ? 'bundle.[chunkhash].js' : 'bundle.js',
        chunkFilename: isProduction ? '[name].[chunkhash].[id].js' : '[name].[id].js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                include: path.join(__dirname, 'src'),
                query: {
                    plugins: ['./tools/babelRelayPlugin']
                }
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },

            {
                test: /\.css$|\.less$/,
                loader: 'style!css!less',
                include: path.join(__dirname, 'src')
            },

            {
                test: /\.*$/,
                loader: 'file?name=[name].[ext]',
                include: path.join(__dirname, 'static')
            }
        ]
    },
    plugins: plugins
};