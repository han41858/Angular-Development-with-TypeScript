import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import ApplicationComponent from './components/application/application.component';
import CarouselComponent from './components/carousel/carousel.component';
import FooterComponent from './components/footer/footer.component';
import NavbarComponent from './components/navbar/navbar.component';
import ProductItemComponent from './components/product-item/product-item.component';
import SearchComponent from './components/search/search.component';
import StarsComponent from './components/stars/stars.component';
import { ProductService } from './services/product.service';
import HomeComponent from './components/home/home.component';
import ProductDetailComponent from './components/product-detail/product-detail.component';

@NgModule({
	imports : [BrowserModule,
		RouterModule.forRoot([
			{ path : '', component : HomeComponent },
			{ path : 'products/:prodTitle', component : ProductDetailComponent }
		])],
	declarations : [ApplicationComponent,
		CarouselComponent,
		FooterComponent,
		NavbarComponent,
		HomeComponent,
		ProductDetailComponent,
		ProductItemComponent,
		SearchComponent,
		StarsComponent],
	providers : [ProductService,
		{ provide : LocationStrategy, useClass : HashLocationStrategy }],
	bootstrap : [ApplicationComponent]
})
export class AppModule {}