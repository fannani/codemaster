var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        siswa : './app/siswaApp.js',
        admin : './app/adminApp.js'
    },
    output: {
        publicPath: 'http://localhost:3000/js',
        path: path.resolve(__dirname, 'dist/js'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                include: path.join(__dirname, 'app'),
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS, using Node Sass by default
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            chunks: ['siswa'],
            template: './app/siswa.html',
            filename: '../siswa.html'
        }),
        new HtmlWebpackPlugin({
            chunks: ['admin'],
            template: './app/admin.html',
            filename: '../admin.html'
        }),
    ]
};