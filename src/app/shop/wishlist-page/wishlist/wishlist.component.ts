import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/models/cart.model';
import { ProductAndDiscount } from 'src/app/models/product.model';
import { Wishlist, WishlistItem } from 'src/app/models/wishlist.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { PurchasedItemService } from 'src/app/services/purchased-item.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { WishlistItemService } from 'src/app/services/wishlist-item.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  productAndDiscount: ProductAndDiscount = new ProductAndDiscount();

  wishlist: Wishlist = new Wishlist();
  total: number = 0;
  errorMsg: string = '';
  displayStyle: string = '';
  itemAndWishList: WishlistItem = new WishlistItem();
  userId: number = 0;
  intervalId: any = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private wishlistService: WishlistService,
    private wishListItemService: WishlistItemService,
    private tokenService: TokenStorageService,
    private productService: ProductService,
    private purchasedItemService: PurchasedItemService
  ) {}

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
    this.wishlistService.getWishlistService(this.userId).subscribe(
      (response) => {
        console.log(response);
        this.wishlist = response;
      },
      (error) => {
        this.errorMsg =
          'There was some internal error! Please try again later!';
      }
    );
  }

  remove(wishListItemId: number) {
    this.wishListItemService
      .removeItemServiceWishlist(wishListItemId)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.displayAllWishlists();
        },
        error: (err) => {},
      });
  }
}
