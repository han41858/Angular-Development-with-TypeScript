import { TestBed, inject } from '@angular/core/testing';

import { BidService } from './bid.service';
import { WebsocketService } from './websocket.service';

describe('BidService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers : [BidService, WebsocketService]
    });
  });

  it('should be created', inject([BidService], (service : BidService) => {
    expect(service).toBeTruthy();
  }));
});
