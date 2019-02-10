const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');


module.exports = merge.smart(common, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    publicPath: 'http://acom-in.cloud.revoluz.io/js',
  },
});
