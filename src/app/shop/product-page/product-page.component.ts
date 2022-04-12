import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CartAndItems,
  CartItem,
  ItemProductAndDiscount,
} from 'src/app/models/cart.model';
import { ProductAndDiscount } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartAndItemsService } from 'src/app/services/cart-and-items.service';
import { CartItemService } from 'src/app/services/cart-item.service';
import { WishlistItemService } from 'src/app/services/wishlist-item.service';
import { ProductAndDiscountService } from 'src/app/services/product-and-discount.service';
import { TokenStorageService } from "../../services/token-storage.service";
import { Review, UserReview } from "../../models/review.model";
import { ReviewService } from "../../services/review.service";
import { ProductService } from "../../services/product.service";
import { TransactionService } from 'src/app/services/transaction.service';

import { CartService } from "../../services/cart.service";
import { Bundle, PurchasedItem } from "../../models/purchased-item.model";
import { Transaction } from "../../models/transaction.model";
import { PurchasedItemService } from "../../services/purchased-item.service";

import { Product } from 'src/app/models/product.model';
import { Cart } from 'src/app/models/cart.model';
import { Wishlist, WishlistItem } from 'src/app/models/wishlist.model';
import { WishlistService } from 'src/app/services/wishlist.service';
import { User } from 'src/app/models/user.model';
@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})

// @NgModule({
//   imports: [ReactiveFormsModule,
//             FormsModule],
// });
export class ProductPageComponent implements OnInit {
  productAndDiscount: ProductAndDiscount = new ProductAndDiscount();
  bundle: Bundle = new Bundle();
  userId: any = 0;
  cartAndItems: CartAndItems = new CartAndItems();
  wishlistId: any = 0;
  currentUser: any = new User();

  buyNowCartAndItems: CartAndItems = new CartAndItems();
  item: CartItem = new CartItem();
  itemwishlist: WishlistItem = new WishlistItem();
  buyNowItem: CartItem = new CartItem();
  productId: number = 0;
  counter = 0;
  title = 'Initiating Testing';
  reviews: UserReview[] = [];
  reviewForm: Review = new Review();
  averageRating: number = 0.0;
  productLoaded: boolean = false;
  cart: Cart = new Cart();
  wishlist: Wishlist = new Wishlist();
  buyNowCart: Cart = new Cart();
  errorMsg: string = '';
  displayStyle: string = '';
  transaction: Transaction = new Transaction();
  newTransaction: Transaction = new Transaction();
  intervalId: any = null;
  reviewRatings = {
    five: 0,
    four: 0,
    three: 0,
    two: 0,
    one: 0,
    //buy now
  };

  constructor(
    private productAndDiscountService: ProductAndDiscountService,
    private cartItemService: CartItemService,
    private cartAndItemsService: CartAndItemsService,
    private wishlistService: WishlistService,
    private wishlistItemService: WishlistItemService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenStorageService,
    private router: Router,
    private cartService: CartService,
    private transactionService: TransactionService,
    private productService: ProductService,
    private purchasedItemService: PurchasedItemService,
    private reviewService: ReviewService
  ) { }

  ngOnInit(): void {
    // let pId: string = this.activatedRoute.snapshot.paramMap.get("productId") == null ? "" :  this.activatedRoute.snapshot.paramMap.get("productId");
    this.userId = this.tokenService.getUser().user_id;
    let param = this.activatedRoute.snapshot.paramMap.get('productId');
    this.productId = param == null ? 0 : parseInt(param);
    this.currentUser = this.tokenService.getUser;

    this.loadData();
    this.loadReviews();
    this.createWishList();
  }

  loadData() {
    this.productAndDiscountService
      .getProductAndDiscountService(this.productId)
      .subscribe({
        next: (response) => {
          this.productAndDiscount = response;
          this.productLoaded = true;
        },
        error: (error) => { },
      });

    // if(this.user.userId <= 0) this.user.userId = 1; //Remove this line if not testing
    this.cartAndItemsService
      .getCartAndItemsWithUserIdService(this.userId)
      .subscribe({
        next: (response) => {
          this.cartAndItems = response;
          // console.log("loadData");
          //console.log(response);
        },
        error: (error) => { },
      });
  }

  updateCartItem() {
    this.item.cartId = this.cartAndItems.cartId;
    this.item.productId = this.productId;
    this.item.cartQty = this.counter;
    this.item.cartItemId = -1;
    this.cartItemService.addNewItemService(this.item).subscribe({
      next: (response) => {
        this.loadData();
      },
      error: (error) => { },
    });
  }

  goToCheckout() {
    this.router.navigate(['checkout']);
  }

  addToWishlist() {
    let itemwishlist = new WishlistItem();
    itemwishlist.wishListPojo.wishListId = this.wishlist.wishListId;
    itemwishlist.productAndDiscountPojo.productId = this.productId;
    console.log(itemwishlist);
    this.wishlistItemService.addNewItemServiceWishlist(itemwishlist).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['wishlist']);
      },
      error: (error) => {   this.router.navigate(['wishlist']); },
    });
  }

  createWishList() {
    this.wishlist.userPojo.user_id = this.userId;
    this.wishlist.wishListTotal = 0;
    console.log(this.wishlist);
    this.wishlistService
      .addWishlistService(this.wishlist)
      .subscribe((response) => {
        console.log(response);
        this.wishlist = response;
      });
  }

  changeQuantity(item: ItemProductAndDiscount, event: any) {
    let newItem = new CartItem();
    newItem.cartItemId = item.cartItemId;
    newItem.cartId = item.cartId;
    newItem.productId = item.productId;
    newItem.cartQty = event.value;
    this.cartItemService.updateItemService(newItem).subscribe({
      next: response => {

        this.loadData();
      },
      error: (err) => { },
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
    if (this.counter > this.productAndDiscount.productQty)
      this.counter = this.productAndDiscount.productQty;
    else if (this.counter < 0) this.counter = 0;
    this.updateCartItem();
  }

  loadReviews() {
    this.reviewRatings = {
      five: 0,
      four: 0,
      three: 0,
      two: 0,
      one: 0,
    };
    this.reviewService.getReviews(this.productId).subscribe({
      next: (response) => {
        // this.goToCheckout()
        this.reviews = response;
        this.sortReviews();
      },
      error: (error) => { },
    });
  }

  sortReviews() {
    let totalStars = 0;
    this.reviews.forEach((review) => {
      totalStars += review.rating;
      if (review.rating == 5) this.reviewRatings.five++;
      else if (review.rating == 4) this.reviewRatings.four++;
      else if (review.rating == 3) this.reviewRatings.three++;
      else if (review.rating == 2) this.reviewRatings.two++;
      else if (review.rating == 1) this.reviewRatings.one++;
    });
    this.averageRating = totalStars / this.reviews.length;
    if (!this.averageRating) this.averageRating = 0;
  }

  postReview() {
    this.reviewForm.productId = this.productId;
    this.reviewForm.userId = this.userId;
    this.reviewService.postReview(this.reviewForm).subscribe({
      next: (response) => {
        // this.goToCheckout()
        this.loadReviews();
      },
      error: (error) => { },
    });
  }

  starRating(): Array<number> {
    return Array.from({ length: this.reviewForm.rating }, (_, i) => i + 1);
  }

  negativeStarRating(): Array<number> {
    return Array.from({ length: 5 - this.reviewForm.rating }, (_, i) => i + 1);
  }

  Rating(rate: number): Array<number> {
    return Array.from({ length: rate }, (_, i) => i + 1);
  }

  negativeRating(rate: number): Array<number> {
    return Array.from({ length: 5 - rate }, (_, i) => i + 1);
  }

  updateReviewRating(event: any) {
    this.reviewForm.rating = parseInt(event);
  }

  checkIfUserExistsInReviews() {
    let userFound = false;
    this.reviews.forEach((review) => {
      if (review.userId == this.userId) userFound = true;
    });
    return userFound;
  }
  toggleBuyNow: boolean = false;
  toggleBuyNowForm() {
    if (this.toggleBuyNow) {
      this.toggleBuyNow = false;
    } else this.toggleBuyNow = true;
  }

  // bundle
  toggleBuyBundle: boolean = false
  toggleBuyBundleForm(){
    if (this.toggleBuyBundle) {
      this.toggleBuyBundle = false;
    } else
      this.toggleBuyBundle = true;

  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  proceedToCheckout() {


    this.cartAndItemsService.getCartAndItemsWithUserIdService(this.userId).subscribe({
      next: response => {

        //getCartItemsWithUserIdService uses userId to create new BuyNowCart

        this.buyNowCartAndItems = response;

        this.buyNowItem.cartId = this.buyNowCartAndItems.cartId;
        this.buyNowItem.productId = this.productId;
        this.buyNowItem.cartQty = 1;
        this.buyNowItem.cartItemId = -1;
        this.cartItemService.addNewItemService(this.buyNowItem).subscribe({
          next: response => {

            //console.log("addNewItemService");
            // console.log(response);
            //console.log("hello");
            this.buyNowCartAndItems.cartId = response.cartId;
           //console.log(this.buyNowCartAndItems.cartId);
            // this.goToCheckout()
            // this.loadData();



            this.buyNowCartAndItems.cartId = response.cartId;
            //getCartAndItemsWithUserIdService gets the item
            this.cartAndItemsService.getCartAndItemsService(this.buyNowCartAndItems.cartId).subscribe({
              next: response => {
                this.buyNowCartAndItems = response;

         
                this.buyNowCart.cartId = this.buyNowCartAndItems.cartId
  


                this.buyNowCart.userId = this.userId;
                this.buyNowCart.cartTotal = parseInt(this.getItemsTotal());

                this.buyNowCart.cartRemoved = true
                this.buyNowCart.cartPaid = true

          
                this.cartService.updateCartService(this.buyNowCart).subscribe((response) => {

                  this.transaction.cartId = this.buyNowCartAndItems.cartId;
                  this.transaction.transactionId = null;
                  this.transaction.transactionDate = null;
                  this.transactionService.sendTransaction(this.transaction).subscribe((response) => {

                    //generates a transaction and save it to the purchase history

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
      error: error => { this.router.navigate(['login']); }
    });

 }



  updateMultiProducts() {
    this.buyNowCartAndItems.cartItems.forEach((item) => {
      let tempProduct = this.toProductModel(item);
      tempProduct.productQty = tempProduct.productQty - item.cartQty;
      this.productService.updateProductsService(tempProduct).subscribe({
        next: (response) => { },
        error: (err) => { },
      });
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
  // calcSingleItem is the a function parametar
  calculateTotalCostWishlist(
    item: ItemProductAndDiscount,
    calcSingleItem: any
  ) {
    return item.cartQty * calcSingleItem(item.productAndDiscount);
  }

  // calculate the item has a discount
  calculateDiscountedItemCost(product: ProductAndDiscount): number {
    let cost = product.productCost;
    let discountPercentage = product.discountPercentage;
    return cost - cost * (discountPercentage / 100);
  }
  getUserSave(): any {
    let save = 0;
    this.cartAndItems.cartItems.forEach((value, index) => {
      save += value.productAndDiscount.productCost * value.cartQty;
    });
    return (save - this.getItemsTotal()).toFixed(2);
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
    let purchasedItems: PurchasedItem[] = [];
    this.buyNowCartAndItems.cartItems.forEach((item) => {
      let temp: PurchasedItem = new PurchasedItem();
      temp.itemId = 0;
      temp.transactionId = transactionId;
      temp.userId = this.userId;
      temp.cartId = item.cartId;
      temp.productId = item.productId;
      temp.itemQty = item.cartQty;
      temp.purchaseCost = this.calculateDiscountedItemCost(
        item.productAndDiscount
      );
      purchasedItems.push(temp);
    });

    this.purchasedItemService.addPurchasedItems(purchasedItems).subscribe({
      next: response => {

      },
      error: (err) => { },
    });
  }
}


