import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductItemComponent } from './product-item.component';
import { StarsComponent } from '../stars/stars.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductItemComponent', () => {
  let component : ProductItemComponent;
  let fixture : ComponentFixture<ProductItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations : [ProductItemComponent, StarsComponent],
      imports : [RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductItemComponent);
    component = fixture.componentInstance;
    component.product = {
      id : 0,
      title : 'test',
      price : 100,
      rating : 5,
      description : 'test',
      categories : ['book']
    };
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
