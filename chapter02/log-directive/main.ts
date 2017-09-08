import { Component, Directive } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// 디렉티브 선언
@Directive({
	selector : 'input[log-directive]',
	host : {
		'(input)' : 'onInput($event)'
	}
})
class LogDirective {
	onInput (event) {
		console.log(event.target.value);
	}
}

// 컴포넌트 선언
@Component({
	selector : 'hello-world',
	template : '<h1>Hello {{ name }}!</h1>' +
	'<input log-directive/>'
})
class HelloWorldComponent {
	name : string;

	constructor () {
		this.name = 'Angular';
	}
}

// 모듈 선언
@NgModule({
	imports : [BrowserModule],
	declarations : [
		LogDirective,
		HelloWorldComponent
	],
	bootstrap : [HelloWorldComponent]
})
export class AppModule {
}

// 부트스트랩
platformBrowserDynamic().bootstrapModule(AppModule)