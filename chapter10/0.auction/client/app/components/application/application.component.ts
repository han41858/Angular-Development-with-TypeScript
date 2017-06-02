import { Component, ViewEncapsulation } from '@angular/core';

@Component({
	selector : 'auction-application',
	styles : [require('./application.component.css')],
	template : require('./application.component.html'),
	encapsulation : ViewEncapsulation.None
})
export default class ApplicationComponent {}
