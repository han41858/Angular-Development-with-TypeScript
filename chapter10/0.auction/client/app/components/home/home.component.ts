import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Product, ProductService } from '../../services/product.service';
import { Observable } from 'rxjs/Observable';

@Component({
	selector : 'auction-home-page',
	styles : [require('./home.component.css')],
	template : require('./home.component.html')
})
export default class HomeComponent {
	products : Observable<Product[]>;
	titleFilter : FormControl = new FormControl();
	filterCriteria : string;

	constructor (private productService : ProductService) {
		this.products = this.productService.getProducts();

		this.productService.searchEvent
			.subscribe(
				params => this.products = this.productService.search(params),
				err => console.log("Can't get products. Error code: %s, URL: %s "),
				() => console.log('DONE')
			);
	}
}