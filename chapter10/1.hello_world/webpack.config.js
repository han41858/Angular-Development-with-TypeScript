var path = require('path');

module.exports = {
	entry : './main',
	output : {
		path : path.resolve(__dirname, 'dist'),
		filename : 'bundle.js'
	}
};
