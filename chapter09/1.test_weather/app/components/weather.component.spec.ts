import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { WeatherComponent } from './weather.component';
import { WeatherService } from '../services/weather.service';

describe('WeatherComponent', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports : [ReactiveFormsModule],
			declarations : [WeatherComponent],
			providers : [{ provide : WeatherService, useValue : {} }]
		})
	});

	it('should display the weather ', () => {
		let fixture = TestBed.createComponent(WeatherComponent);
		let element = fixture.nativeElement;
		let component = fixture.componentInstance;
		component.weather = { place : 'Seoul', humidity : 44, temperature : 15 };

		fixture.detectChanges();

		expect(element.querySelector('h3').innerHTML).toBe('Current weather in Seoul :');
		expect(element.querySelector('li:nth-of-type(1)').innerHTML).toBe('Temperature : 15C');
		expect(element.querySelector('li:nth-of-type(2)').innerHTML).toBe('Humidity : 44%');
	});
});