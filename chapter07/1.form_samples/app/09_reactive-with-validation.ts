import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';

/**
 * FormControl에 입력된 SSN이 유효하면 true를 반환하고, 유효하지 않으면 false를 반환한다.
 */
function ssnValidator (control : FormControl) : { [key : string] : any } {
	const value : string = control.value || '';
	const valid = value.match(/^\d{9}$/);
	return valid ? null : { ssn : true };
}

/**
 * 모든 FormControl에 입력된 값이 같으면 true를 반환하고,
 * 다른 값이 있으면 false를 반환한다.
 */
function equalValidator ({ value } : FormGroup) : { [key : string] : any } {
	const [first, ...rest] = Object.keys(value || {});
	const valid = rest.every(v => value[v] === value[first]);
	return valid ? null : { equal : true };
}

@Component({
	selector : 'app',
	template : `
		<form [formGroup]="formModel" (ngSubmit)="onSubmit()" novalidate>
			<div>
				<p>
					Username:
					<input type="text" formControlName="username">
					<span [hidden]="!formModel.hasError('required', 'username')">Username is required</span>
				</p>
			</div>
			<div>
				<p>
					SSN:
					<input type="text" formControlName="ssn">
					<span [hidden]="!formModel.hasError('ssn', 'ssn')">SSN is invalid</span>
				</p>
			</div>
			<div formGroupName="passwordsGroup">
				<div>
					<p>
						Password:
						<input type="password" formControlName="password">
						<span [hidden]="!formModel.hasError('minlength', ['passwordsGroup', 'password'])">Password is too short</span>
					</p>
				</div>
				<div>
					<p>
						Confirm password:
						<input type="password" formControlName="pconfirm">
						<span [hidden]="!formModel.hasError('equal', 'passwordsGroup')">Passwords must be the same</span>
					</p>
				</div>
			</div>
			<button type="submit">Submit</button>
		</form>
	`
})
class AppComponent {
	formModel : FormGroup;

	constructor () {
		this.formModel = new FormGroup({
			'username' : new FormControl('', Validators.required),
			'ssn' : new FormControl('', ssnValidator),
			'passwordsGroup' : new FormGroup({
				'password' : new FormControl('', Validators.minLength(5)),
				'pconfirm' : new FormControl('')
			}, equalValidator)
		});
	}

	onSubmit () {
		if (this.formModel.valid) {
			console.log(this.formModel.value);
		}
	}
}

@NgModule({
	imports : [BrowserModule, ReactiveFormsModule],
	declarations : [AppComponent],
	bootstrap : [AppComponent]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);