var path = require('path');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './app/slime-finder.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].bundle.js.map'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            'slime-finder': path.resolve(__dirname, 'lib')
        }
    },
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
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