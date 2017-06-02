import { Component, Input } from '@angular/core';
import { Product } from '../../services/product.service';

@Component({
	selector : 'auction-product-item',
	styles: [require('./product-item.component.css')],
	template: require('./product-item.component.html')
})
export default class ProductItemComponent {
	@Input() product : Product;
}
