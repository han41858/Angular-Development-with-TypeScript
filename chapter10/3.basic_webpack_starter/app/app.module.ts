import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpModule } from '@angular/http'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'

import { ROUTING } from './app.routing';
import { AppComponent } from './components/app.component';
import { AboutComponent } from './components/about.component';
import { HomeComponent } from './components/home.component';

@NgModule({
	imports : [BrowserModule, HttpModule, ROUTING],
	declarations : [AppComponent, AboutComponent, HomeComponent],
	bootstrap : [AppComponent],
	providers : [
		{ provide : LocationStrategy, useClass : HashLocationStrategy },
	]
})
export class AppModule {}