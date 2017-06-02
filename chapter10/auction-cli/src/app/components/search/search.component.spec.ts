import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { BaseRequestOptions, ConnectionBackend, RequestOptions, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

describe('SearchComponent', () => {
  let component : SearchComponent;
  let fixture : ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations : [SearchComponent],
      imports : [ReactiveFormsModule],
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
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
