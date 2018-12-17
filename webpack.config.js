const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-inline-source-map',
  entry: {
    siswa: ['./app/siswaApp.jsx', 'webpack-hot-middleware/client'],
    admin: ['./app/adminApp.jsx', 'webpack-hot-middleware/client'],
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
        use: [
          'babel-loader',
          'eslint-loader',
        ],
        include: path.join(__dirname, 'app'),
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [

    new webpack.HotModuleReplacementPlugin(),

    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      chunks: ['siswa'],
      template: './app/siswa.html',
      filename: '../siswa.html',
    }),
    new HtmlWebpackPlugin({
      chunks: ['admin'],
      template: './app/admin.html',
      filename: '../admin.html',
    }),

  ],
};
