import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Product, ProductService } from '../../services/product.service';
import { Observable } from 'rxjs/Observable';

@Component({
	selector : 'auction-home-page',
	styleUrls : ['app/components/home/home.component.css'],
	template : `
		<div class="row carousel-holder">
			<div class="col-md-12">
				<auction-carousel></auction-carousel>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<input placeholder="Filter products by title"
						class="form-control" type="text"
						[formControl]="titleFilter">
				</div>
			</div>
		</div>
		<div class="row">
			<div *ngFor="let product of products | async" class="col-sm-4 col-lg-4 col-md-4">
				<auction-product-item [product]="product"></auction-product-item>
			</div>
		</div>
	`
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