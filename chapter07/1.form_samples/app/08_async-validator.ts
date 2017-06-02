import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

/**
 * 유효성 검사에 성공하면 null을 반환하고, 검사에 실패하면 에러 객체를 반환한다.
 */
function asyncSsnValidator (control : FormControl) : Observable<any> {
	const value : string = control.value || '';
	const valid = value.match(/^\d{9}$/);
	return Observable
		.of(valid ? null : { ssn : true })
		.delay(1000);
}

@Component({
	selector : 'app',
	template : `
		<form [formGroup]="form">
			<p>
				SSN : <input type="text" formControlName="my-ssn">
				<span>{{ form.status }}</span>
			</p>
		</form>
	`
})
class AppComponent {
	form : FormGroup;

	constructor () {
		this.form = new FormGroup({
			'my-ssn' : new FormControl('', null, asyncSsnValidator)
		});
	}
}

@NgModule({
	imports : [BrowserModule, ReactiveFormsModule],
	declarations : [AppComponent],
	bootstrap : [AppComponent]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);