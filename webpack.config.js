// Things you have to config
var BUNDLE_NAME		= 'react-pagination.min.js';
var ENTRY_FILE    = 'pagination.js';
var LIBRARY       = 'reactPagination';

// Things you can but should not config
var SOURCE_FOLDER	= __dirname + '/src/';
var DIST_FOLDER		= __dirname + '/dist/';
var webpack       = require('webpack');

module.exports = {
	entry: SOURCE_FOLDER + '/' + ENTRY_FILE,
	target: 'web',
	output: {
		library: LIBRARY,
		path: DIST_FOLDER,
		filename: BUNDLE_NAME,
		publicPath: '/'
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false,
        semicolons: true
      }
    })
  ],

	module: {
		loaders: [
			{ test: /\.(js|jsx)$/, exclude: /(bower_components|node_modules)/, loader: 'babel-loader' }
		]
	},

  externals: {
    'react': 'React'
  },

	devServer: {
		port: 8080,
		host: '0.0.0.0',
		lazy: true,
		contentBase: DIST_FOLDER,
		stats: { colors: true }
	}
};
