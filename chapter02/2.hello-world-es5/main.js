// 컴포넌트 정의
(function (app) {
	app.HelloWorldComponent =
		ng.core.Component({
			selector : 'hello-world',
			template : '<h1>Hello {{ name }}!</h1>'
		})
			.Class({
				constructor : function () {
					this.name = 'Angular';
				}
			});
})(window.app || (window.app = {}));

// 모듈 정의
(function (app) {
	app.AppModule =
		ng.core.NgModule({
			imports : [ng.platformBrowser.BrowserModule],
			declarations : [app.HelloWorldComponent],
			bootstrap : [app.HelloWorldComponent]
		})
			.Class({
				constructor : function () {
				}
			});
})(window.app || (window.app = {}));

// 부트스트랩
(function (app) {
	document.addEventListener('DOMContentLoaded', function () {
		console.log('bootstrap');
		ng.platformBrowserDynamic
			.platformBrowserDynamic()
			.bootstrapModule(app.AppModule);
	});
})(window.app || (window.app = {}));