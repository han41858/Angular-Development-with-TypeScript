import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { CarouselComponent } from '../carousel/carousel.component';
import { ProductItemComponent } from '../product-item/product-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StarsComponent } from '../stars/stars.component';
import { ProductService } from '../../services/product.service';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions, ConnectionBackend, Http, RequestOptions } from '@angular/http';

describe('HomeComponent', () => {
  let component : HomeComponent;
  let fixture : ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations : [HomeComponent, CarouselComponent, ProductItemComponent, StarsComponent],
      imports : [RouterTestingModule],
      providers : [
        { provide : ConnectionBackend, useClass : MockBackend },
        { provide : RequestOptions, useClass : BaseRequestOptions },
        ProductService,
        Http
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
