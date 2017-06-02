System.config({
	transpiler : 'typescript',

	typescriptOptions : {
		emitDecoratorMetadata : true,
		target : 'ES5',
		module : 'commonjs'
	},

	map : {
		'@angular' : 'node_modules/@angular',
		'rxjs' : 'node_modules/rxjs'
	},

	packages : {
		'rxjs' : { main : 'Rx' },
		'@angular/core' : { main : 'bundles/core.umd.min.js' },
		'@angular/common' : { main : 'bundles/common.umd.min.js' },
		'@angular/compiler' : { main : 'bundles/compiler.umd.min.js' },
		'@angular/platform-browser' : { main : 'bundles/platform-browser.umd.min.js' },
		'@angular/platform-browser-dynamic' : { main : 'bundles/platform-browser-dynamic.umd.min.js' },

		'app' : { main : 'main', defaultExtension : 'ts' }
	}
});