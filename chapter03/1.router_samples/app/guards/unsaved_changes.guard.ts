import { CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class UnsavedChangesGuard implements CanDeactivate {
	canDeactivate () {
		return window.confirm('You have unsaved changes. Still want to leave?');
	}
}