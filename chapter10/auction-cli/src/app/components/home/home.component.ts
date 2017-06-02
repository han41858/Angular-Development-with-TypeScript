import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Product, ProductService } from '../../services/product.service';

@Component({
  selector : 'app-home',
  templateUrl : './home.component.html',
  styleUrls : ['./home.component.css']
})
export class HomeComponent {
  products : Observable<Product[]>;

  constructor (private productService : ProductService) {
    this.products = this.productService.getProducts();

    this.productService.searchEvent
      .subscribe(
        params => this.products = this.productService.search(params),
        err => console.log('Can\'t get products. Error code: %s, URL: %s '),
        () => console.log('DONE')
      );
  }
}
