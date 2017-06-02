const path = require('path');

// Webpack and its plugins
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const OccurrenceOrderPlugin = require('webpack/lib/optimize/OccurrenceOrderPlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

const metadata = {
	MODE : process.env.MODE || 'development',
	HOST : process.env.HOST || 'localhost',
	PORT : process.env.PORT || 8080
};

const config = {
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
		loaders : []
	},
	plugins : [
		new DefinePlugin({ 'webpack' : { 'MODE' : JSON.stringify(metadata.MODE) } }),
		new CommonsChunkPlugin({ name : 'vendor', filename : 'vendor.bundle.js', minChunks : Infinity })
	],
	devtool : 'source-map'
};

switch (metadata.MODE) {
	case 'development':
		config.module.loaders.push(
			{ test : /\.css$/, loader : 'raw-loader', exclude : /node_modules/ },
			{ test : /\.css$/, loader : 'style-loader!css-loader?-minimize', exclude : /app/ },
			{ test : /\.html$/, loader : 'raw-loader' },
			{ test : /\.ts$/, loader : 'awesome-typescript-loader', query : { compilerOptions : { noEmit : false } } }
		);

		config.devServer = {
			contentBase : 'app',
			historyApiFallback : true,
			host : metadata.HOST,
			port : metadata.PORT,

			stats : {
				maxModules : 0,
				warnings : false
			}
		};
		break;

	case 'production':
		config.module.loaders.push(
			{ test : /\.css$/, loader : 'to-string-loader!css-loader', exclude : /node_modules/ },
			{ test : /\.css$/, loader : 'style-loader!css-loader', exclude : /app/ },
			{ test : /\.html$/, loader : 'html-loader?caseSensitive=true' },
			{ test : /\.ts$/, loader : 'awesome-typescript-loader', query : { compilerOptions : { noEmit : false } } }
		);

		config.plugins.push(
			new CompressionPlugin({ regExp : /\.css$|\.html$|\.js$|\.map$/ }),
			new CopyWebpackPlugin([{ from : './app/index.html', to : 'index.html' }]),
			new OccurrenceOrderPlugin(true),
			new UglifyJsPlugin({
				compress : { screw_ie8 : true },
				mangle : { screw_ie8 : true }
			})
		);

		config.stats = {
			maxModules : 0,
			warnings : false
		};
		break;
}

module.exports = config;