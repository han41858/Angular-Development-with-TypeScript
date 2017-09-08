import { NgModule, Component, Directive, ElementRef, HostListener } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// 디렉티브 선언
@Directive({
	selector : '[highlight]'
})
class HighlightDirective {
	constructor (private el : ElementRef) {
	}

	private highlight (color : string) {
		this.el.nativeElement.style.backgroundColor = color;
	}

	@HostListener('mouseenter')
	onMouseEnter () {
		this.highlight('yellow');
	}

	@HostListener('mouseleave')
	onMouseLeave () {
		this.highlight(null);
	}
}

// 컴포넌트 선언
@Component({
	selector : 'hello-world',
	template : '<h1 highlight>Hello {{ name }}!</h1>'
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
		HelloWorldComponent,
		HighlightDirective
	],
	bootstrap : [HelloWorldComponent]
})
export class AppModule {
}

// 부트스트랩
platformBrowserDynamic().bootstrapModule(AppModule)