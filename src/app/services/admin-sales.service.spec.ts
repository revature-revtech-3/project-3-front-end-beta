import { TestBed } from '@angular/core/testing';

import { AdminSalesService } from './admin-sales.service';

describe('AdminSalesService', () => {
  let service: AdminSalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminSalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
