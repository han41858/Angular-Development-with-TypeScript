import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule, Component, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
	selector : 'order-processor',
	template : `
		Buying {{ quantity }} shares of {{ stockSymbol }}
	`,
	styles : [`:host { background : cyan; }`]
})
class OrderComponent {
	@Input() stockSymbol : string;
	@Input() quantity : number;
}

@Component({
	selector : 'app',
	template : `
		<input type="text" placeholder="Enter stock (e.g. IBM)" (input)="onInputEvent($event)">
		<br/>
		<order-processor [stockSymbol]="stock"
			quantity="100"></order-processor>
	`
})
class AppComponent {
	stock : string;

	onInputEvent ({ target }) : void {
		this.stock = target.value;
	}
}
@NgModule({
	imports : [BrowserModule],
	declarations : [AppComponent, OrderComponent],
	bootstrap : [AppComponent]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);