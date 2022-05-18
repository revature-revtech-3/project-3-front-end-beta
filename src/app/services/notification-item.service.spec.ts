import { TestBed } from '@angular/core/testing';

import { NotificationItemService } from './notification-item.service';

describe('NotificationItemService', () => {
  let service: NotificationItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
