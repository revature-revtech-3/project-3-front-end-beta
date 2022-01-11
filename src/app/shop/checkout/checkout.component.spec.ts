import { RouterTestingModule } from '@angular/router/testing';
import { CartAndItemsService } from './../../services/cart-and-items.service';
import { CartItem } from './../../models/cart.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { CartItemService } from 'src/app/services/cart-item.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CheckoutComponent } from './checkout.component';
import { CartAndItems } from 'src/app/models/cart.model';
import { of } from 'rxjs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';





//Assert
describe('CheckoutComponent', () => {
  // catch to all services we need
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let cartItemService: CartItemService;
  // let cartService: CartService;
  let cartAndItemsService: CartAndItemsService;
  // let transactionService: TransactionService;
  // let productService: ProductService;
  // let router: Router;
  let activateRoute: ActivatedRoute;
  // HttpTestingController used for mock data
  let httpTestingController: HttpTestingController;
  let expectedReq: CartAndItems;
  let removeitem: CartAndItems;
  let changeQuant: CartItem


  //fake data to be returned by request.
  changeQuant = {
    "cartItemId": 1,
    "cartId": 2,
    "productId": 1,
    "cartQty": 5,
  }


  expectedReq =
  {
    "cartId": 1,
    "userId": 1,
    "cartTotal": 5424,
    "cartPaid": true,
    "cartRemoved": true,
    "cartItems": [
      {
        "cartItemId": 1,
        "cartId": 1,
        "productId": 1,
        "cartQty": 1,
        "productAndDiscount": {
          "productId": 1,
          "productSku": "A0XB34XBOX00234",
          "productName": "Xbox One",
          "productCost": 199.99,
          "productCategory": "Gaming Consoles",
          "productDescription": "Xbox One. Rated #1 by gamers worldwide.",
          "productQty": 9,
          "imageUrl": "https://media.istockphoto.com/photos/xbox-one-picture-id472044719?k=20&m=472044719&s=612x612&w=0&h=CXhGzWN2fZsw0IrHMbYc6kShj1klOkfkmLcHeD4Nopw=",
          "productRemoved": false,
          "discountId": -1,
          "discountDescription": "N/A",
          "discountPercentage": 0.0
        }
      },
      {
        "cartItemId": 2,
        "cartId": 1,
        "productId": 2,
        "cartQty": 5,
        "productAndDiscount": {
          "productId": 2,
          "productSku": "A0XB34GPHONE00234",
          "productName": "iPhone 13 Pro",
          "productCost": 1099.99,
          "productCategory": "Phones",
          "productDescription": "Lastest Model - 6.7 inch display",
          "productQty": 15
          ,
          "imageUrl": "https://media.istockphoto.com/photos/newly-released-iphone-13-pro-mockup-set-with-back-and-front-angles-picture-id1356372494?k=20&m=1356372494&s=612x612&w=0&h=4IyK75PK9dd4zY-CPAF_scPK-HwsoYS2mmWJZzBwp2A=",
          "productRemoved": false,
          "discountId": 1,
          "discountDescription": "stuff",
          "discountPercentage": 0.05
        }
      }
    ]// as unknown as CartAndItemsService[]
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      declarations: [CheckoutComponent],
      // for regular test use HttpClientModule
      // HttpClientTestingModule incloud the mock implemntation of HTTP service as get, post 
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        HttpClientModule],
      providers: [
        CartItemService,
        CartService,
        CartAndItemsService,
        TransactionService,
        ProductService,
        Storage
      ]

    }).compileComponents()
  });
  //-------------------------------------------------------------------------------------------

  beforeEach(() => {
    TestBed.configureTestingModule({});
    // prepare fixture
    fixture = TestBed.createComponent(CheckoutComponent);
    //make an instance from the component
    component = fixture.componentInstance;
    fixture.detectChanges();
    activateRoute = TestBed.inject(ActivatedRoute);
    // HttpTestingController contain tools help you to control the request 
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  //-------------------------------------------------------------------------------------------
  // aftereach will run after each execute (it) 
  afterEach(() => {
    //httpTestingController.verify(); //Verifies that no requests are outstanding.
    // expectOne will check if the url is executed
    httpTestingController.expectOne("http://localhost:7777/api/cart-and-items/user/undefined").flush(null, { status: 200, statusText: 'Ok' });// closing the request
  });

  //-----------------Test display All Carts---------------------------------
  it('display All Carts on Service method', () => {
    const displayservice: CartAndItemsService = TestBed.inject(CartAndItemsService);

    spyOn(displayservice, 'getCartAndItemsWithUserIdService')
      .and.returnValue(of(expectedReq)); // rule

    component.displayAllCarts();
    expect(component.cartAndItems).toEqual(expectedReq);
  });
  //--------------------Test change Quantity---------------------------------


  //   let newItem = new CartItem();
  //   newItem.cartItemId = item.cartItemId;
  //   newItem.cartId = item.cartId;
  //   newItem.productId = item.productId;
  //   newItem.cartQty = event.value;

  //   spyOn(displayservice, 'updateItemService')
  //     .and.returnValue(of(expectedReq)); // rule

  //   component.displayAllCarts();
  //   expect(component.cartAndItems).toEqual(expectedReq);
  // });

  // it('display change Quantity', () => {
  //   const displayservice: CartItemService = TestBed.inject(CartItemService);
  //   spyOn(displayservice, 'updateItemService')
  //     .and.returnValue(of(changeQuant)); // rule
  //   //debugger;
  //   //component.changeQuantity(changeQuant, 5);
  //   expect(component.cart).toEqual(expectedReq);
  // });
  //----------------check for atleast one all button in the page-----------------------------------
  it('process of checkout butten', () => {
    const button = fixture.debugElement.queryAll(By.css('button'));
    expect(button.length >= 1).toBeTruthy();
  });

  //----------------Check for Proceed to checkout button ---------------------------------------
  it('process of checkout butten Proceed to checkout', () => {
    const button = fixture.debugElement.queryAll(By.css('button'));
    const nativeButton: HTMLButtonElement = button[0].nativeElement;
    expect(nativeButton.textContent).toEqual('Proceed to checkout');
  });

  //-------------------------------------------------------------------------------------------





  //create fake service and method
  // const mySpy = jasmine.createSpyObj('CartItemService', ['myCart']);
  // mySpy.myCart.and.returnValue(expectedReq);
  // expect(mySpy.myCart()).toBe('', 'wrong data')

  // expect(displayservice.getCartAndItemsWithUserIdService).toBe(expectedReq),
  //   fail



  // it('remove item from cart', () => {
  //   const cartItemService: CartItemService = TestBed.inject(CartItemService);
  //   cartItemService.removeItemService(2).subscribe((data: Boolean) => {
  //     component.remove(2);
  //     expect(data).toBeTrue;
  //   });
  // });

  // it('remove item from cart', () => {
  //   const cartItemService: CartItemService = TestBed.inject(CartItemService);
  //   const spy = spyOn(cartItemService, 'removeItemService').and.returnValue(false);
  //   //component.remove(2);
  //   //expect(component.cartAndItems).toBeTrue();
  //   expect(component.remove(2)).toBeTrue();

  // });
  //--------------------Test change Quantity----------------------------------------------


  //     it('display All Carts on Service method', () => {
  //       // let cartItemService = fixture.debugElement.injector.get(CartItemService);
  //       // let displayAll = spyOn(cartItemService, 'getCartAndItemsWithUserIdService').withArgs({}).and.returnValue(of('mock result data'))


  //     const displayservice: CartItemService = TestBed.get(CartItemService);
  //     let displayAll = spyOn(displayservice, 'getCartAndItemsWithUserIdService').withArgs({})
  //       .and.returnValue(of('mock result data'))

  //     displayservice.getCartAndItemsWithUserIdService({}).subscribe((data: CartItemService) => {
  //       console.log("called")
  //       expect(data).toEqual(expectedReq, 'mock result data'));

  //     expect(displayservice.getCartAndItemsWithUserIdService).toHaveBeenCalled();

  //   });


  // });

});




