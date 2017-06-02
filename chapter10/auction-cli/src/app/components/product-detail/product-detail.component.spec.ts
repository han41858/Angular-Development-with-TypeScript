import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailComponent } from './product-detail.component';
import { StarsComponent } from '../stars/stars.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductService } from '../../services/product.service';
import { BidService } from '../../services/bid.service';
import { WebsocketService } from '../../services/websocket.service';
import { MockBackend } from '@angular/http/testing';
import { ConnectionBackend, Http, RequestOptions, BaseRequestOptions } from '@angular/http';

describe('ProductDetailComponent', () => {
  let component : ProductDetailComponent;
  let fixture : ComponentFixture<ProductDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations : [ProductDetailComponent, StarsComponent],
      imports : [FormsModule, RouterTestingModule],
      providers : [
        { provide : ConnectionBackend, useClass : MockBackend },
        { provide : RequestOptions, useClass : BaseRequestOptions },
        ProductService,
        BidService,
        WebsocketService,
        Http
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
