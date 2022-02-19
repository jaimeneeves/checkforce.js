const webpack = require('webpack')
const path = require('path')
var PACKAGE = require('./package.json')
const year = new Date().getFullYear()
var banner = `${PACKAGE.name} - ${PACKAGE.version} (c) ${year}, ${PACKAGE.author} |
  ${PACKAGE.license} | ${PACKAGE.homepage}`

module.exports = (env) => {
  const BUNDLE = env.BUNDLE === 'true';
  const MINIFY = env.MINIFY === 'true';

  let fileDest = `checkforce`;
  const externals = {
    '@popperjs/core': 'Popper',
    'zxcvbn': 'zxcvbn'
  };

  if (BUNDLE) {
    fileDest += '.bundle'
    // Remove
    delete externals['@popperjs/core']
    delete externals['zxcvbn']
  }

  return {
    entry: './src/index.js',
    mode: MINIFY ? 'production' : 'development',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: MINIFY ? `${fileDest}.min.js` : `${fileDest}.js`,
      library: {
        name: 'CheckForce',
        type: 'umd'
      },
      libraryExport: 'default',
      publicPath: '/'
    },
    devtool: 'source-map',
    externals: externals,
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    },
    devServer: {
      static: {
        directory: path.join(__dirname, './'),
      },
      port: 9000
    },
    plugins: [
      new webpack.BannerPlugin(banner)
    ]
  }
}
