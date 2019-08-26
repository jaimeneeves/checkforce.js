require('dotenv').config()
const webpack = require('webpack')
const path = require('path')
var PACKAGE = require('./package.json')
const year = new Date().getFullYear()
var banner = `${PACKAGE.name} - ${PACKAGE.version} (c) ${year}, ${PACKAGE.author} |
  ${PACKAGE.license} | ${PACKAGE.homepage}`

module.exports = {
  entry: './src/checkforce.js',
  mode: process.env.NODE_ENV || 'development',
  output: {
    library: 'CheckForce',
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true,
    path: path.resolve(__dirname, 'dist'),
    filename: 'checkforce.min.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin(banner)
  ]
}
