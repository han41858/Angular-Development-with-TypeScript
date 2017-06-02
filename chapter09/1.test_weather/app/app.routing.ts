import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { WeatherComponent } from './components/weather.component';

export const routes : Routes = [
	{ path : '', component : HomeComponent },
	{ path : 'weather', component : WeatherComponent }
];

export const routing = RouterModule.forRoot(routes);
