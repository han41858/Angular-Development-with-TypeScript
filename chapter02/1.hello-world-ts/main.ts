import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// 컴포넌트 선언
@Component({
	selector : 'hello-world',
	template : '<h1>Hello {{ name }}!</h1>'
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
	declarations : [HelloWorldComponent],
	bootstrap : [HelloWorldComponent]
})
export class AppModule {}

// 부트스트랩
platformBrowserDynamic().bootstrapModule(AppModule)