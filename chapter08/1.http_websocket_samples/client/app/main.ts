import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
	selector : 'app',
	template : `
		<h1>All Products</h1>
		<ul>
			<li *ngFor="let product of products">{{ product.title }}</li>
		</ul>
	`
})
class AppComponent {
	products : Array<string> = [];
	theDataSource : Observable;

	constructor (private http : Http) {
		this.theDataSource = this.http.get('/products')
			.map(res => res.json());
	}

	ngOnInit () {
		// 서버에서 데이터를 받아온다
		this.theDataSource.subscribe(
			data => {
				if (Array.isArray(data)) {
					this.products = data;
				} else {
					this.products.push(data);
				}
			},
			err => console.log("Can't get products. Error code: %s, URL: %s ", err.status, err.url),
			() => console.log('Product(s) are retrieved')
		);
	}
}

@NgModule({
	imports : [BrowserModule,
		HttpModule],
	declarations : [AppComponent],
	bootstrap : [AppComponent]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);