import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/models/cart.model';
import { ProductAndDiscount } from 'src/app/models/product.model';
import { ItemProductAndDiscount, Wishlist, WishlistAndItems, WishlistItem } from 'src/app/models/wishlist.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { PurchasedItemService } from 'src/app/services/purchased-item.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { WishlistAndItemsService } from 'src/app/services/wishlist-and-items.service';
import { WishlistItemService } from 'src/app/services/wishlist-item.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { CommonModule } from '@angular/common';






@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  productAndDiscount: ProductAndDiscount = new ProductAndDiscount();
  wishlistAndItems: WishlistAndItems = new WishlistAndItems();
  wishlist: Wishlist = new Wishlist();
  total: number = 0
  errorMsg: string = "";
  displayStyle: string = "";
  itemUpdating: WishlistItem = new WishlistItem();
  userId: number = 0;
  intervalId: any = null;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private wishlistAndItemsService: WishlistAndItemsService,
    private authService: AuthService,
    private wishlistService: WishlistService,
    private wishlistItemService: WishlistItemService,
    private tokenService: TokenStorageService,
    private productService: ProductService,
    private purchasedItemService: PurchasedItemService) { }

  ngOnInit(): void {

       //Line below from authService is not working.
       this.userId = this.tokenService.getUser().user_id;
       if (this.userId <= 0) this.userId = 1; //Remove this line if not testing
       this.displayAllWishlists();
 }

 ngOnDestroy() {
  clearInterval(this.intervalId);
}

displayAllWishlists() {
  this.wishlistAndItemsService.getWishlistAndItemsService(this.userId).subscribe((response) => {
    this.wishlistAndItems = response;
  }, error => {
    this.errorMsg = 'There was some internal error! Please try again later!';
  });
}

 // calculate the item has a discount
 calculateDiscountedItemCost(product: ProductAndDiscount): number {
  let cost = product.productCost;
  let discountPercentage = product.discountPercentage;
  return cost - (cost * (discountPercentage / 100));
}

// return the item cost without any calculate
calculateSingleItemCost(product: ProductAndDiscount): number {
  return product.productCost;
}
calculateTotalSavings(product: ProductAndDiscount): number {
  let cost = product.productCost;
  let discountPercentage = product.discountPercentage;
  return cost * (discountPercentage / 100);
}
// calcSingleItem is the a function parametar
calculateTotalCost(item: ItemProductAndDiscount, calcSingleItem: any) {
  return item.wishlistQty * calcSingleItem(item.productAndDiscount);
}

getItemsTotal(): any {
  let total = 0;
  this.wishlistAndItems.wishlistItems.forEach((value, index) => {
    total += this.calculateTotalCost(value, this.calculateDiscountedItemCost);
  });

  return total.toFixed(2);
}

getUserSave(): any {
  let save = 0;
  this.wishlistAndItems.wishlistItems.forEach((value, index) => {
    save += value.productAndDiscount.productCost * value.wishlistQty;
  });
  return (save - this.getItemsTotal()).toFixed(2)

}

remove(productId: number) {
  this.wishlistItemService.removeItemServiceWishlist(productId).subscribe({
    next: response => {
      this.displayAllWishlists();
    },
    error: err => {
    }
  })
}
changeQuantity(item: ItemProductAndDiscount) {
  let newItem = new WishlistItem();
  newItem.wishlistItemId = item.wishlistItemId;
  newItem.wishlistId = item.wishlistId;
  newItem.productId = item.productId;
  newItem.wishlistQty = item.wishlistQty;
  this.wishlistItemService.updateItemServiceWishlist(newItem).subscribe({
    next: response => {

      this.displayAllWishlists();
    },
    error: err => {
    }
  });
}

proceedToCheckout() {
  this.wishlist.wishlistId = this.wishlistAndItems.wishlistId
  this.wishlist.userId = this.wishlistAndItems.userId
  this.wishlist.wishlistTotal = parseInt(this.getItemsTotal());
 

  this.wishlistService.updateWishlistService(this.wishlist).subscribe((response) => {
    response;
  }, error => {
    this.errorMsg = 'There was some internal error! Please try again later!';
  });

  











}}
