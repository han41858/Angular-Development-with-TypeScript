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

		'@angular/core' : {
			main : 'bundles/core.umd.min.js',
			map : { './testing' : './bundles/core-testing.umd.min.js' }
		},
		'@angular/common' : {
			main : 'bundles/common.umd.min.js',
			map : { './testing' : './bundles/common-testing.umd.min.js' }
		},
		'@angular/compiler' : {
			main : 'bundles/compiler.umd.min.js',
			map : { './testing' : './bundles/compiler-testing.umd.min.js' }
		},
		'@angular/forms' : {
			main : 'bundles/forms.umd.min.js',
			map : { './testing' : './bundles/forms-testing.umd.min.js' }
		},
		'@angular/http' : {
			main : 'bundles/http.umd.min.js',
			map : { './testing' : './bundles/http-testing.umd.min.js' }
		},
		'@angular/platform-browser' : {
			main : 'bundles/platform-browser.umd.min.js',
			map : { './testing' : './bundles/platform-browser-testing.umd.min.js' }
		},
		'@angular/platform-browser-dynamic' : {
			main : 'bundles/platform-browser-dynamic.umd.min.js',
			map : { './testing' : './bundles/platform-browser-dynamic-testing.umd.min.js' }
		},
		'@angular/router' : {
			main : 'bundles/router.umd.min.js',
			map : { './testing' : './bundles/router-testing.umd.min.js' }
		},

		'app' : { main : 'main', defaultExtension : 'ts' }
	}
});