import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchComponent } from './components/search/search.component';
import { ProductService } from './services/product.service';
import { FooterComponent } from './components/footer/footer.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { WebsocketService } from './services/websocket.service';
import { StarsComponent } from './components/stars/stars.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { BidService } from './services/bid.service';

@NgModule({
  declarations : [
    AppComponent,
    HomeComponent,
    CarouselComponent,
    NavbarComponent,
    SearchComponent,
    FooterComponent,
    ProductItemComponent,
    StarsComponent,
    ProductDetailComponent
  ],
  imports : [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path : '', component : HomeComponent },
      { path : 'products/:productId', component : ProductDetailComponent }
    ])
  ],
  providers : [ProductService, WebsocketService, BidService],
  bootstrap : [AppComponent]
})
export class AppModule {
}
