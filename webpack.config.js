var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-inline-source-map',
    entry: {
        siswa : ['./app/siswaApp.js', 'webpack-hot-middleware/client'],
        admin : ['./app/adminApp.js','webpack-hot-middleware/client']
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
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            }
        ]
    },
    plugins: [

        new webpack.HotModuleReplacementPlugin(),

        new webpack.NoEmitOnErrorsPlugin(),
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