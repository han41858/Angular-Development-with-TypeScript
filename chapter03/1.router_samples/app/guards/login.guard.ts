import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginGuard implements CanActivate {
	private checkIfLoggedIn () : boolean {
		// 실제 로그인 서비스를 사용하는 로직은 여기에 작성한다.
		// 지금은 임의로 true나 false를 반환한다.

		let loggedIn : boolean = Math.random() < 0.5;

		if (!loggedIn) {
			console.log("LoginGuard : The user is not logged in and can't navigate to product details");
		}

		return loggedIn;
	}

	canActivate () {
		return this.checkIfLoggedIn();
	}
}