import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuarterlySalesComponent } from './quarterly-sales.component';

describe('QuarterlySalesComponent', () => {
  let component: QuarterlySalesComponent;
  let fixture: ComponentFixture<QuarterlySalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuarterlySalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuarterlySalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
