import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, Review, ProductService } from '../../services/product.service';
import { BidService } from '../../services/bid.service';
import StarsComponent from '../stars/stars.component';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector : 'auction-product-page',
	styles : ['auction-stars.large { font-size : 24px; }'],
	template : require('./product-detail.component.html')
})
export default class ProductDetailComponent implements OnDestroy {
	product : Product;
	reviews : Review[];

	currentBid : number;
	newComment : string;
	newRating : number;

	isReviewHidden : boolean = true;
	isWatching : boolean = false;

	private subscription : Subscription = null;

	constructor (route : ActivatedRoute,
	             productService : ProductService,
	             private bidService : BidService) {
		let productId : number = parseInt(route.snapshot.params['productId']);

		productService
			.getProductById(productId)
			.subscribe(
				product => {
					this.product = product;
					this.currentBid = product.price;
				},
				error => console.error(error)
			);

		productService
			.getReviewsForProduct(productId)
			.subscribe(
				reviews => this.reviews = reviews,
				error => console.error(error)
			);
	}

	addReview () {
		let review = new Review(0, this.product.id, new Date(), 'Anonymous',
			this.newRating, this.newComment);
		console.log('Adding review ' + JSON.stringify(review));

		this.reviews = [...this.reviews, review];
		this.product.rating = this.averageRating(this.reviews);

		this.resetForm();
	}

	averageRating (reviews : Review[]) {
		let sum = reviews.reduce((average, review) => average + review.rating, 0);
		return sum / reviews.length;
	}

	resetForm () {
		this.newRating = 0;
		this.newComment = null;
		this.isReviewHidden = true;
	}

	toggleWatchProduct () {
		if (this.subscription !== null) {
			this.subscription.unsubscribe();
			this.subscription = null;
			this.isWatching = false;
		} else {
			this.isWatching = true;
			this.subscription = this.bidService.watchProduct(this.product.id)
				.subscribe(
					products => this.currentBid = products.find((p : any) => p.productId === this.product.id).bid,
					error => console.log(error));
		}
	}

	ngOnDestroy () : any {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}