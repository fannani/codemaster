const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const dotenv = require('dotenv');

dotenv.config();

module.exports = merge.smart(common, {
  mode: 'production',
  devtool: 'source-map',

});
