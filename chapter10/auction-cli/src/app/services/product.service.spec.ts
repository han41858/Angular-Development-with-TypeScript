import { MockBackend, MockConnection } from '@angular/http/testing';
import { Product, ProductService } from './product.service';
import { Injector } from '@angular/core';
import { async, fakeAsync, TestBed } from '@angular/core/testing';
import { ConnectionBackend, Http, Response, RequestOptions, BaseRequestOptions, ResponseOptions } from '@angular/http';

describe('ProductService', () => {
  let mockBackend : MockBackend;
  let service : ProductService;

  const mockProduct : Product = {
    id : 1,
    title : 'test',
    price : 100,
    rating : 4,
    description : 'this is test',
    categories : ['book']
  };

  beforeEach(() => {
    const injector : Injector = TestBed.configureTestingModule({
      providers : [
        { provide : ConnectionBackend, useClass : MockBackend },
        { provide : RequestOptions, useClass : BaseRequestOptions },
        ProductService,
        Http // imports : [HttpModule] 를 사용하지 않고 프로바이더로 등록
      ]
    });

    mockBackend = injector.get(ConnectionBackend);
    service = injector.get(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getProductById() should return Product with ID=1 - async()', async(() => {
    mockBackend.connections.subscribe((connection : MockConnection) => {
      connection.mockRespond(new Response(new ResponseOptions({ body : JSON.stringify(mockProduct) })));
    });

    service.getProductById(1).subscribe(p => {
      expect(p.id).toBe(1);
    });
  }));

  it('getProductById() should return Product with ID=1 - fakeAsync()', fakeAsync(() => {
    service.getProductById(1).subscribe(p => {
      expect(p.id).toBe(1);
    });

    mockBackend.connections.subscribe((connection : MockConnection) => {
      connection.mockRespond(new Response(new ResponseOptions({ body : JSON.stringify(mockProduct) })));
    });
  }));
});
