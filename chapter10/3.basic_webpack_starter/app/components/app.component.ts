import { Component } from '@angular/core';
import { HomeComponent } from './home.component';
import { AboutComponent } from './about.component';

@Component({
	selector : 'app',
	template : `
		<h1>Basic Webpack Starter</h1>
		<div>
			<a [routerLink]="['/']">Home</a>
			<a [routerLink]="['/about']">About</a>
		</div>
		<div>
			<router-outlet></router-outlet>
		</div>
	`
})
export class AppComponent {}