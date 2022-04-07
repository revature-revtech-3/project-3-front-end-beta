import { TestBed } from '@angular/core/testing';

import { WishlistAndItemsService } from './wishlist-and-items.service';

describe('WishlistAndItemsService', () => {
  let service: WishlistAndItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WishlistAndItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
