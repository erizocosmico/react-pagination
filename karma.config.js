var webpack = require('karma-webpack');
var path = require('path');

module.exports = function (config) {
  config.set({
    frameworks: [ 'jasmine' ],
    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      'tests/**/*_spec.js'
    ],
    autoWatch: true,
    plugins: [webpack, 'karma-jasmine', 'karma-phantomjs-launcher', 'karma-coverage'],
    browsers: [ 'PhantomJS' ],
    preprocessors: {
      'tests/**/*_spec.js': ['webpack'],
      'src/**/*.js': ['webpack']
    },
    reporters: [ 'progress', 'coverage' ],
    coverageReporter: {
      dir: 'build/reports/coverage',
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' },
        { type: 'cobertura', subdir: '.', file: 'cobertura.txt' }
      ]
    },
    webpack: {
      module: {
        loaders: [{
          test: /\.(js|jsx)$/, exclude: /(bower_components|node_modules)/,
          loader: 'babel-loader'
        }],
        postLoaders: [{
          test: /\.js$/, exclude: /(node_modules|bower_components|tests)/,
          loader: 'istanbul-instrumenter'
        }]
      }
    },
    webpackMiddleware: { noInfo: true }
  });
};
