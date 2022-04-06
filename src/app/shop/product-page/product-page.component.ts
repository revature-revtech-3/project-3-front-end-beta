import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartAndItems, CartItem, ItemProductAndDiscount } from 'src/app/models/cart.model';
import { ProductAndDiscount } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartAndItemsService } from 'src/app/services/cart-and-items.service';
import { CartItemService } from 'src/app/services/cart-item.service';
import { ProductAndDiscountService } from 'src/app/services/product-and-discount.service';
import { TokenStorageService } from "../../services/token-storage.service";
import { HttpClientModule } from '@angular/common/http';
import { Review, UserReview } from "../../models/review.model";
import { ReviewService } from "../../services/review.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProductService } from "../../services/product.service";
import { TransactionService } from 'src/app/services/transaction.service';
import { CartService } from "../../services/cart.service";
import { PurchasedItem } from "../../models/purchased-item.model";
import { Transaction } from "../../models/transaction.model";
import { PurchasedItemService } from "../../services/purchased-item.service";
import { Product } from 'src/app/models/product.model';
import { Cart } from 'src/app/models/cart.model';
@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})

// @NgModule({
//   imports: [ReactiveFormsModule,
//             FormsModule],
// });
export class ProductPageComponent implements OnInit {
  productAndDiscount: ProductAndDiscount = new ProductAndDiscount();
  userId: any = 0;
  cartAndItems: CartAndItems = new CartAndItems();
  buyNowCartAndItems: CartAndItems = new CartAndItems();
  item: CartItem = new CartItem();
  buyNowItem: CartItem = new CartItem();
  productId: number = 0;
  counter = 0;
  title = "Initiating Testing";
  reviews: UserReview[] = [];
  reviewForm: Review = new Review();
  averageRating: number = 0.0;
  productLoaded: boolean = false;
  cart: Cart = new Cart();
  buyNowCart: Cart = new Cart();
  errorMsg: string = "";
  displayStyle: string = "";
  transaction: Transaction = new Transaction();
  newTransaction: Transaction = new Transaction();
  intervalId: any = null;
  reviewRatings = {
    "five": 0,
    "four": 0,
    "three": 0,
    "two": 0,
    "one": 0,
    //buy now


  }


  constructor(private productAndDiscountService: ProductAndDiscountService,
    private cartItemService: CartItemService,
    private cartAndItemsService: CartAndItemsService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenStorageService,
    private router: Router,
    private cartService: CartService,
    private transactionService: TransactionService,
    private productService: ProductService,
    private purchasedItemService: PurchasedItemService,
    private reviewService: ReviewService) { }

  ngOnInit(): void {
    // let pId: string = this.activatedRoute.snapshot.paramMap.get("productId") == null ? "" :  this.activatedRoute.snapshot.paramMap.get("productId");
    this.userId = this.tokenService.getUser().user_id;
    let param = this.activatedRoute.snapshot.paramMap.get("productId");
    this.productId = (param == null) ? 0 : parseInt(param);
    this.loadData();
    this.loadReviews();


  }




  loadData() {
    this.productAndDiscountService.getProductAndDiscountService(this.productId).subscribe({
      next: response => {
        this.productAndDiscount = response;
        this.productLoaded = true;
      },
      error: error => {
      }
    });
    // if(this.user.userId <= 0) this.user.userId = 1; //Remove this line if not testing
    this.cartAndItemsService.getCartAndItemsWithUserIdService(this.userId).subscribe({
      next: response => {
        this.cartAndItems = response;
        console.log("loadData");
        console.log(response);

      },
      error: error => {
      }
    });
  }
  updateCartItem() {
    this.item.cartId = this.cartAndItems.cartId;
    this.item.productId = this.productId;
    this.item.cartQty = this.counter;
    this.item.cartItemId = -1;
    this.cartItemService.addNewItemService(this.item).subscribe({
      next: response => {

        // this.goToCheckout()
        this.loadData();
      },
      error: error => {
      }
    });
  }

  goToCheckout() {
    this.router.navigate(['checkout']);
  }

  changeQuantity(item: ItemProductAndDiscount, event: any) {
    let newItem = new CartItem();
    newItem.cartItemId = item.cartItemId;
    newItem.cartId = item.cartId;
    newItem.productId = item.productId;
    newItem.cartQty = event.value;
    this.cartItemService.updateItemService(newItem).subscribe({
      next: response => {
        console.log("changeQuantity");
        console.log(response);
        this.loadData();
      },
      error: err => {
      }
    });
  }

  increaseCount() {
    this.counter++;
    this.qtyChange();
  }
  decreaseCount() {
    this.counter--;
    this.qtyChange();
  }

  qtyChange() {
    if (this.counter > this.productAndDiscount.productQty) this.counter = this.productAndDiscount.productQty;
    else if (this.counter < 0) this.counter = 0;
    this.updateCartItem();
  }

  loadReviews() {
    this.reviewRatings = {
      "five": 0,
      "four": 0,
      "three": 0,
      "two": 0,
      "one": 0,
    }
    this.reviewService.getReviews(this.productId).subscribe({
      next: response => {
        // this.goToCheckout()
        this.reviews = response;
        this.sortReviews();
      },
      error: error => {
      }
    });
  }

  sortReviews() {
    let totalStars = 0;
    this.reviews.forEach(review => {
      totalStars += review.rating;
      if (review.rating == 5) this.reviewRatings.five++;
      else if (review.rating == 4) this.reviewRatings.four++;
      else if (review.rating == 3) this.reviewRatings.three++;
      else if (review.rating == 2) this.reviewRatings.two++;
      else if (review.rating == 1) this.reviewRatings.one++;
    })
    this.averageRating = totalStars / this.reviews.length;
    if (!this.averageRating) this.averageRating = 0;
  }

  // getAverageRating() {
  //   let totalStars = 0;
  //
  // }

  postReview() {
    this.reviewForm.productId = this.productId;
    this.reviewForm.userId = this.userId;
    this.reviewService.postReview(this.reviewForm).subscribe({
      next: response => {
        // this.goToCheckout()
        this.loadReviews();
      },
      error: error => {
      }
    });
  }

  starRating(): Array<number> {
    // if (this.reviewForm.rating < 1) this.reviewForm.rating = 1;
    // console.log();
    return Array.from({ length: this.reviewForm.rating }, (_, i) => i + 1)
  }

  negativeStarRating(): Array<number> {
    return Array.from({ length: 5 - this.reviewForm.rating }, (_, i) => i + 1)
    // return Array(5 - this.reviewForm.rating);
  }

  Rating(rate: number): Array<number> {
    // if (this.reviewForm.rating < 1) this.reviewForm.rating = 1;
    return Array.from({ length: rate }, (_, i) => i + 1)
  }

  negativeRating(rate: number): Array<number> {
    return Array.from({ length: 5 - rate }, (_, i) => i + 1)
    // return Array(5 - this.reviewForm.rating);
  }


  // numSequence(): Array<number> {
  //   // if (this.reviewForm.rating < 1) this.reviewForm.rating = 1;
  //   return Array(this.reviewForm.rating);
  // }


  updateReviewRating(event: any) {
    this.reviewForm.rating = parseInt(event);
  }


  checkIfUserExistsInReviews() {
    let userFound = false;
    this.reviews.forEach(review => {
      if (review.userId == this.userId) userFound = true;
    })
    return userFound;
  }
  toggleBuyNow: boolean = false;
  toggleBuyNowForm() {
    if (this.toggleBuyNow) {
      this.toggleBuyNow = false;
    } else
      this.toggleBuyNow = true;

  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  proceedToCheckout() {


    this.cartAndItemsService.getCartAndItemsWithUserIdService(this.userId).subscribe({
      next: response => {
        console.log("getCartAndItemsWithUSerIdService");
        console.log(response);
        this.buyNowCartAndItems = response;

        this.buyNowItem.cartId = this.buyNowCartAndItems.cartId;
        this.buyNowItem.productId = this.productId;
        this.buyNowItem.cartQty = 1;
        this.buyNowItem.cartItemId = -1;
        this.cartItemService.addNewItemService(this.buyNowItem).subscribe({
          next: response => {
            console.log("addNewItemService");
            console.log(response);
            console.log("hello");
            this.buyNowCartAndItems.cartId = response.cartId;
            console.log(this.buyNowCartAndItems.cartId);
            // this.goToCheckout()
            //this.loadData();

            this.cartAndItemsService.getCartAndItemsWithUserIdService(this.userId).subscribe({
              next: response => {
                this.buyNowCartAndItems = response;
                console.log("loadData");
                console.log(response);
                console.log(this.buyNowCartAndItems.cartId);

                this.buyNowCart.cartId = this.buyNowCartAndItems.cartId
                //this.buyNowCart.userId = this.buyNowCartAndItems.userId

                this.buyNowCart.userId = this.userId;
                this.buyNowCart.cartTotal = parseInt(this.getItemsTotal());
                this.buyNowCart.cartRemoved = true
                this.buyNowCart.cartPaid = true
                console.log("buyNowCart:");
                console.log(this.buyNowCart);
                this.cartService.updateCartService(this.buyNowCart).subscribe((response) => {
                  console.log("updateCartService");
                  console.log(response);
                  this.transaction.cartId = this.buyNowCartAndItems.cartId;
                  this.transaction.transactionId = null;
                  this.transaction.transactionDate = null;
                  this.transactionService.sendTransaction(this.transaction).subscribe((response) => {
                    console.log("sendTransaction");
                    console.log(response);
                    this.newTransaction = response;
                    this.updateMultiProducts();
                    this.addItemsToPurchaseHistory(response.transactionId);
                    this.intervalId = setInterval(() => {
                      this.displayStyle = "none";
                      this.router.navigate(['/confirmation-checkout/' + this.newTransaction.transactionId]);
                    }, 2000);
                  }, error => {
                    this.errorMsg = 'There was some internal error! Please try again later!';
                  });
                }, error => {
                  this.errorMsg = 'There was some internal error! Please try again later!';
                });
              },
              error: error => {
              }
            });


          },
          error: error => {
          }
        });
      },
      error: error => {
      }
    });






  }

  updateMultiProducts() {
    this.buyNowCartAndItems.cartItems.forEach((item) => {
      let tempProduct = this.toProductModel(item);
      tempProduct.productQty = tempProduct.productQty - item.cartQty;
      this.productService.updateProductsService(tempProduct).subscribe({
        next: response => {
        },
        error: err => {
        }
      })
    });
  }

  getItemsTotal(): any {
    let total = 0;
    this.buyNowCartAndItems.cartItems.forEach((value, index) => {
      total += this.calculateTotalCost(value, this.calculateDiscountedItemCost);
    });

    return total.toFixed(2);
  }

  // calcSingleItem is the a function parametar
  calculateTotalCost(item: ItemProductAndDiscount, calcSingleItem: any) {
    return item.cartQty * calcSingleItem(item.productAndDiscount);
  }

  // calculate the item has a discount
  calculateDiscountedItemCost(product: ProductAndDiscount): number {
    let cost = product.productCost;
    let discountPercentage = product.discountPercentage;
    return cost - (cost * (discountPercentage / 100));
  }
  getUserSave(): any {
    let save = 0;
    this.cartAndItems.cartItems.forEach((value, index) => {
      save += value.productAndDiscount.productCost * value.cartQty;
    });
    return (save - this.getItemsTotal()).toFixed(2)

  }

  toProductModel(item: ItemProductAndDiscount) {
    let product = new Product();
    product.productId = item.productAndDiscount.productId;
    product.productCost = item.productAndDiscount.productCost;
    product.productQty = item.productAndDiscount.productQty;
    product.productSku = item.productAndDiscount.productSku;
    product.imageUrl = item.productAndDiscount.imageUrl;
    product.productCategory = item.productAndDiscount.productCategory;
    product.productDescription = item.productAndDiscount.productDescription;
    product.productName = item.productAndDiscount.productName;
    product.productRemoved = item.productAndDiscount.productRemoved;
    return product;
  }

  addItemsToPurchaseHistory(transactionId: number) {
    console.log("transaction id:" + transactionId);
    console.log(this.buyNowCartAndItems.cartItems);
    let purchasedItems: PurchasedItem[] = [];
    this.buyNowCartAndItems.cartItems.forEach((item) => {
      let temp: PurchasedItem = new PurchasedItem();
      temp.itemId = 0;
      temp.transactionId = transactionId;
      temp.userId = this.userId;
      temp.cartId = item.cartId;
      temp.productId = item.productId;
      temp.itemQty = item.cartQty
      temp.purchaseCost = this.calculateDiscountedItemCost(item.productAndDiscount);
      purchasedItems.push(temp);
    });
    console.log(purchasedItems);
    this.purchasedItemService.addPurchasedItems(purchasedItems).subscribe({
      next: response => {
        console.log("addPurcahsedItems");
        console.log(response);
      },
      error: err => {

      }
    })
  }

}