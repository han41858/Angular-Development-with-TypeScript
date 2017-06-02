import { Component, Directive, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FormsModule, FormControl, FormGroup, Validators, NG_VALIDATORS } from '@angular/forms';

/**
 * FormControl에 입력된 SSN이 유효하면 true를 반환하고, 유효하지 않으면 false를 반환한다.
 */
function ssnValidator (control : FormControl) : { [key : string] : any } {
	const value : string = control.value || '';
	const valid = value.match(/^\d{9}$/);
	return valid ? null : { ssn : true };
}

/**
 * 템플릿에서 유효성 검사를 적용하기 위해
 * {@link ssnValidator} 함수를 디렉티브로 랩핑한다.
 */
@Directive({
	selector : '[ssn]',
	providers : [{ provide : NG_VALIDATORS, useValue : ssnValidator, multi : true }]
})
class SsnValidatorDirective {}

/**
 * 모든 FormControl에 입력된 값이 같으면 true를 반환하고,
 * 다른 값이 있으면 false를 반환한다.
 */
function equalValidator ({ value } : FormGroup) : { [key : string] : any } {
	const [first, ...rest] = Object.keys(value || {});
	const valid = rest.every(v => value[v] === value[first]);
	return valid ? null : { equal : true };
}

/**
 * 템플릿에서 유효성 검사를 적용하기 위해
 * {@link equalValidator} 함수를 디렉티브로 랩핑한다.
 */
@Directive({
	selector : '[equal]',
	providers : [{ provide : NG_VALIDATORS, useValue : equalValidator, multi : true }]
})
class EqualValidatorDirective {
}

@Component({
	selector : 'app',
	directives : [
		SsnValidatorDirective,
		EqualValidatorDirective
	],
	template : `
		<form #f="ngForm" (ngSubmit)="onSubmit(f.value, f.valid)" novalidate>
			<div>
				<p>
					Username :
					<input type="text" name="username" ngModel required>
					<span [hidden]="!f.form.hasError('required', 'username')">Username is required</span>
				</p>
			</div>
			<div>
				<p>
					SSN :
					<input type="text" name="ssn" ngModel ssn>
					<span [hidden]="!f.form.hasError('ssn', 'ssn')">SSN in invalid</span>
				</p>
			</div>
			<div ngModelGroup="passwordsGroup" equal>
				<div>
					<p>
						Password :
						<input type="password" name="password" ngModel minlength="5">
						<span [hidden]="!f.form.hasError('minlength', ['passwordsGroup', 'password'])">Password is too short</span>
					</p>
				</div>
				<div>
					<p>
						Confirm password :
						<input type="password" name="pconfirm" ngModel>
						<span [hidden]="!f.form.hasError('equal', 'passwordsGroup')">Passwords must be the same</span>
					</p>
				</div>
			</div>
			<button type="submit">Submit</button>
		</form>
	`
})
class AppComponent {
	onSubmit (formValue : any, isFormValid : boolean) {
		if (isFormValid) {
			console.log(formValue);
		}
	}
}

@NgModule({
	imports : [BrowserModule, FormsModule],
	declarations : [AppComponent, EqualValidatorDirective, SsnValidatorDirective],
	bootstrap : [AppComponent]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);