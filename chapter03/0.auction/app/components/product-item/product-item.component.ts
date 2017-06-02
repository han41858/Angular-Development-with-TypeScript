import { Component, Input } from '@angular/core';
import { Product } from '../../services/product.service';

@Component({
	selector : 'auction-product-item',
	styleUrls : ['app/components/product-item/product-item.component.css'],
	templateUrl : 'app/components/product-item/product-item.component.html'
})
export default class ProductItemComponent {
	@Input() product : Product;
}
