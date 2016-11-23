const webpack = require('webpack');
var PACKAGE = require('./package.json');
var banner = PACKAGE.name + ' - ' + PACKAGE.version + ' | ' +
  '(c) 2016, ' + new Date().getFullYear() + '  ' + PACKAGE.author + ' | ' +
  PACKAGE.license + ' | ' +
  PACKAGE.homepage;

module.exports = {
  entry: ['babel-polyfill', './src/checkforce.js'],
  output: {
    library: 'CheckForce',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    path: './dist',
    filename: 'checkforce.min.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: false }
    }),
    new webpack.BannerPlugin(banner)
  ]
};
