var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        'slime-finder': './app/slime-finder.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].bundle.js.map'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            'slime-finder': path.resolve(__dirname, 'lib')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: 'head',
            minify: {
                caseSensitive: true,
                collapseWhitespace: true,
                keepClosingSlash: true,
                removeComments: true
            },
            template: 'html/index.html',
            xhtml: true
        }),
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                // this assumes your vendor imports exist in the node_modules directory
                return module.context && module.context.indexOf('node_modules') !== -1;
            }
        })
    ],
    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'ts-loader' },
            {
                test: /bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
                loader: 'imports-loader?jQuery=jquery'
            },
            {
                test: /Bacon\.js$/,
                loader: 'imports-loader?jQuery=jquery'
            },
            { test: /\.(woff2?|svg)$/, loader: 'url-loader?limit=10000' },
            { test: /\.(ttf|eot)$/   , loader: 'file-loader' },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader?minimize' }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader?minimize'   },
                    { loader: 'sass-loader'  }
                ]
            }
        ]
    }
};