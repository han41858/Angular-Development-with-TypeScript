import 'reflect-metadata';
import 'zone.js';
import 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import { enableProdMode } from '@angular/core';

if(webpack.MODE === 'production'){
	enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);