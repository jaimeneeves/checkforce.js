// Karma configuration
// Generated on Sun Dec 02 2018 15:14:17 GMT-0400 (-04)
const webpackConfig = require('./webpack.config.js')

module.exports = function (config) {
  config.set({
    plugins: [
      require('karma-webpack'),
      require('karma-mocha'),
      require('karma-phantomjs-launcher')
    ],
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],

    // list of files / patterns to load in the browser
    files: [
      'src/**/*.js',
      'test/**/*.js'
      // './node_modules/phantomjs-polyfill/bind-polyfill.js'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/**/*.js': ['webpack'],
      'test/**/*.js': ['webpack']
    },

    webpack: {
      module: webpackConfig.module,
      plugins: webpackConfig.plugins
    },

    client: {
      mocha: {
        timeout: 6000
      }
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    // reporters: ['progress'],

    // // web server port
    // port: 9876,
    //
    // // enable / disable colors in the output (reporters and logs)
    // colors: true,
    //
    // // level of logging
    // // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    // logLevel: config.LOG_INFO,
    //
    // // enable / disable watching file and executing tests whenever any file changes
    // autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS']
  })
}
