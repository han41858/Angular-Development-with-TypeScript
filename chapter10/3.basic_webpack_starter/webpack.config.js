const path = require('path');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry : {
		'app' : './app/main',
		'vendor' : './app/vendor'
	},
	resolve : {
		extensions : ['.ts', '.js']
	},
	output : {
		path : path.resolve(__dirname, 'dist'),
		filename : '[name].bundle.js'
	},
	module : {
		loaders : [
			{ test : /\.ts$/, loader : 'awesome-typescript-loader', exclude : /node_modules/ }
		]
	},
	plugins : [
		new CommonsChunkPlugin({ name : 'vendor', filename : 'vendor.bundle.js' }),
		new CopyWebpackPlugin([{ from : './app/index.html', to : 'index.html' }])
	],
	devServer : {
		contentBase : 'app',
		historyApiFallback : true,

		stats : {
			maxModules : 0,
			warnings : false
		}
	},
	devtool : 'source-map',
	stats : {
		maxModules : 0,
		warnings : false
	}
};
