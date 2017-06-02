import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import ApplicationComponent from './components/application/application.component';
import CarouselComponent from './components/carousel/carousel.component';
import FooterComponent from './components/footer/footer.component';
import NavbarComponent from './components/navbar/navbar.component';
import ProductItemComponent from './components/product-item/product-item.component';
import SearchComponent from './components/search/search.component';
import StarsComponent from './components/stars/stars.component';
import { ProductService } from './services/product.service';

@NgModule({
	imports : [BrowserModule],
	declarations : [ApplicationComponent,
		CarouselComponent,
		FooterComponent,
		NavbarComponent,
		ProductItemComponent,
		SearchComponent,
		StarsComponent],
	providers : [ProductService],
	bootstrap : [ApplicationComponent]
})
export class AppModule {}