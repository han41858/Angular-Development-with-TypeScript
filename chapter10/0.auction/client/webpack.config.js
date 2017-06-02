const path = require('path');

// Webpack and its plugins
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const OccurrenceOrderPlugin = require('webpack/lib/optimize/OccurrenceOrderPlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');

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
		loaders : [
			{ test : /\.woff$/, loader : 'url-loader?limit=10000&mimetype=application/font-woff' },
			{ test : /\.woff2$/, loader : 'url-loader?limit=10000&mimetype=application/font-woff' },
			{ test : /\.ttf$/, loader : 'url-loader?limit=10000&mimetype=application/octet-stream' },
			{ test : /\.svg$/, loader : 'url-loader?limit=10000&mimetype=image/svg+xml' },
			{ test : /\.eot$/, loader : 'file-loader' }
		]
	},
	plugins : [
		new DefinePlugin({ 'webpack' : { 'MODE' : JSON.stringify(metadata.MODE) } }),
		new ProvidePlugin({ jQuery : 'jquery' })
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

		config.plugins.push(
			new CommonsChunkPlugin({ name : 'vendor', filename : 'vendor.bundle.js', minChunks : Infinity })
		);

		config.devServer = {
			contentBase : '.',
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
			new CommonsChunkPlugin({ name : 'vendor', filename : 'vendor.bundle.js', minChunks : Infinity }),
			new CompressionPlugin({ regExp : /\.css$|\.html$|\.js$|\.map$/ }),
			new CopyWebpackPlugin([{ from : './index.html', to : 'index.html' }]),
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

	case 'test':
		config.module.loaders.push(
			{ test : /\.css$/, loader : 'raw-loader', exclude : /node_modules/ },
			{ test : /\.css$/, loader : 'style-loader!css-loader?-minimize', exclude : /app/ },
			{ test : /\.html$/, loader : 'raw-loader' },
			{ test : /\.ts$/, loader : 'awesome-typescript-loader', query : { compilerOptions : { noEmit : false } } }
		);

		config.stats = {
			maxModules : 0,
			warnings : false
		};
		break;
}

module.exports = config;