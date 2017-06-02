import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { Location } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRoutes, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { routes } from '../app.routing';
import { WeatherService } from '../services/weather.service';
import { AppComponent } from './app.component';
import { HomeComponent } from '../components/home.component';
import { WeatherComponent } from '../components/weather.component';

describe('Router', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports : [ReactiveFormsModule, RouterTestingModule,
				RouterTestingModule.withRoutes(routes)],
			declarations : [AppComponent, HomeComponent, WeatherComponent],
			providers : [{ provide : WeatherService, useValue : {} }]
		});
	});

	it('should be able to navigate to home using commands API',
		fakeAsync(inject([Router, Location], (router : Router, location : Location) => {
				TestBed.createComponent(AppComponent);
				router.navigate(['/']);
				tick();
				expect(location.path()).toBe('/');
			})
		));

	it('should be able to navigate to weather using commands API',
		fakeAsync(inject([Router, Location], (router : Router, location : Location) => {
				TestBed.createComponent(AppComponent);
				router.navigate(['/weather']);
				tick();
				expect(location.path()).toBe('/weather');
			})
		));

	it('should be able to navigate to weather by URL',
		fakeAsync(inject([Router, Location], (router : Router, location : Location) => {
				TestBed.createComponent(AppComponent);
				router.navigateByUrl('/weather');
				tick();
				expect(location.path()).toEqual('/weather');
			})
		));
});