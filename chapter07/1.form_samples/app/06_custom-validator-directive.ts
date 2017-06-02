import { Component, Directive, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FormsModule, FormControl, NG_VALIDATORS } from '@angular/forms';

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
 * ssnValidator() 함수를 디렉티브로 랩핑한다.
 */
@Directive({
	selector : '[ssn]',
	providers : [{ provide : NG_VALIDATORS, useValue : ssnValidator, multi : true }]
})
class SsnValidatorDirective {}

@Component({
	selector : 'app',
	template : `
		<form #f="ngForm">
			<p>
				SSN : <input type="text" name="my-ssn" ngModel ssn>
				<span [hidden]="!f.form.hasError('ssn', 'my-ssn')">SSN is invalid</span>
			</p>
		</form>
	`
})
class AppComponent {}

@NgModule({
	imports : [BrowserModule, FormsModule],
	declarations : [AppComponent, SsnValidatorDirective],
	bootstrap : [AppComponent]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);