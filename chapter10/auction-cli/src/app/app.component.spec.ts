import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchComponent } from './components/search/search.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FooterComponent } from './components/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductService } from './services/product.service';
import { ConnectionBackend, RequestOptions, BaseRequestOptions, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

describe('AppComponent', () => {
  let component : AppComponent;
  let fixture : ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations : [AppComponent, NavbarComponent, SearchComponent, FooterComponent],
      imports : [RouterTestingModule, ReactiveFormsModule],
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
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));
});
