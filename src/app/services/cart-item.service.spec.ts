
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { AuthService } from './auth.service';

describe('Cart Item Service', () => {
  let fixture: ComponentFixture<CartItemService>;
  let component: CartItemService;
  let httpClient: HttpClient;
  let cartItemService: CartItemService;
  let httpTestingController: HttpTestingController;

  //let httpClientMock: HttpClient
  let activateRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      declarations: [CartItemService],
      imports: [
        HttpClientTestingModule,
        RouterModule,
        RouterTestingModule,
        HttpClientModule],
      providers: [
        CartItemService
      ],

    }).compileComponents()
      .then(() => {
        TestBed.configureTestingModule({});
        // prepare fixture
        fixture = TestBed.createComponent(CartItemService);
        component = fixture.componentInstance;
        fixture.detectChanges();
        activateRoute = TestBed.inject(ActivatedRoute);
        httpTestingController = TestBed.inject(HttpTestingController);
        cartItemService = TestBed.inject(CartItemService);

      })
  });

  //-------------------------------------------------------------------------------------------

  it(`Change Item quantity`, () => {
    const cartItemService: CartItemService = TestBed.inject(CartItemService);

    let item: any;
    const changeQuant =
    {
      "cartItemId": 1,
      "cartId": 2,
      "productId": 1,
      "cartQty": 5,
    }

    let response;
    spyOn(cartItemService, 'updateItemService').and.returnValue(of(changeQuant));
    cartItemService.updateItemService(item).subscribe(res => { response = res });
    expect(response).toEqual(jasmine.objectContaining({
      changeQuant
    }));

    let req = httpTestingController.expectOne('http://localhost:7777/api/cart-items/undefined');
    expect(req.request.method).toBe("PUT");

    req.flush(changeQuant);
    httpTestingController.verify();
  });
  //-------------------------------------------------------------------------------------------

  it(`Remove item`, () => {
    const cartItemService: CartItemService = TestBed.inject(CartItemService);

    let response;
    spyOn(cartItemService, 'removeItemService').and.returnValue(of(true));
    cartItemService.removeItemService(2).subscribe(item => { response = item });
    expect(response).toBeTruthy;

  });

});

