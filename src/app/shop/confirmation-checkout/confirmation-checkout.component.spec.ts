import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationCheckoutComponent } from './confirmation-checkout.component';

describe('ConfirmationCheckoutComponent', () => {
  let component: ConfirmationCheckoutComponent;
  let fixture: ComponentFixture<ConfirmationCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationCheckoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
