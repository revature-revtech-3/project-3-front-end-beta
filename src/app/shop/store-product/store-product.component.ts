import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Bundle, Product, ProductAndDiscount } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { Cart, CartAndItems, CartItem, ItemProductAndDiscount } from "../../models/cart.model";
import { TokenStorageService } from "../../services/token-storage.service";
import { CartItemService } from "../../services/cart-item.service";
import { CartAndItemsService } from "../../services/cart-and-items.service";
import { Wishlist, WishlistItem } from 'src/app/models/wishlist.model';

import { WishlistItemService } from 'src/app/services/wishlist-item.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { CartService } from 'src/app/services/cart.service';
import { Transaction } from 'src/app/models/transaction.model';
import { TransactionService } from 'src/app/services/transaction.service';
import { PurchasedItemService } from 'src/app/services/purchased-item.service';
import { PurchasedItem } from 'src/app/models/purchased-item.model';
import { WishlistService } from 'src/app/services/wishlist.service';


@Component({
  selector: 'app-store-product',
  templateUrl: './store-product.component.html',
  styleUrls: ['./store-product.component.scss'],
})
export class StoreProductComponent implements OnInit {
  
  darkModeToggle = new FormControl(false);
  @HostBinding('class') className = '';
  allProducts: Product[] = [];
  allBundles: Bundle[] = [];
  allDiscountProducts: ProductAndDiscount[] = [];
  indexArray: number[] = [];
  productObject: Product = new Product();
  formValue!: FormGroup;
  errorProductMsg: string = '';
  saveIndex: number = 0;
  userId: any = 0;
  cartAndItems: CartAndItems = new CartAndItems();
  // wishlistAndItems: WishlistAndItems = new WishlistAndItems();
  buyBundleCartAndItems: CartAndItems = new CartAndItems();
  buyBundleCart: Cart = new Cart();
  buyBundleItem1: CartItem = new CartItem();
  buyBundleItem2: CartItem = new CartItem();
  transaction: Transaction = new Transaction();
  newTransaction: Transaction = new Transaction();
  intervalId: any = null;
  displayStyle: string = "";

  wishlist: Wishlist = new Wishlist();
  wishlistItems: WishlistItem = new WishlistItem();


  //Array for Form Fields to add new Product
  newProduct: Product = {
    productId: 0,
    productSku: '',
    productName: '',
    productDescription: '',
    productCategory: '',
    productCost: 0.0,
    productQty: 0,
    productRemoved: false,
    imageUrl: '',
  };

  NewDiscountedProduct: ProductAndDiscount = {
    productId: 0,
    productSku: '',
    productName: '',
    productDescription: '',
    productCategory: '',
    productCost: 0.0,
    productQty: 0,
    imageUrl: '',
    productRemoved: false,
    discountId: 0,

    discountDescription: "",
    discountPercentage: 0
  }

  //Bundle
  //Array for Form Fields to Create new Bundle
  newBundle: Bundle = {
    bundleId: 0,
    bundleName: "",
    bundlePercentage: 0.0,
    productOnePojo: new Product(),
    productTwoPojo: new Product()

  }
  addBundle: Bundle = {
    bundleId: 0,
    bundleName: "",
    bundlePercentage: 0.0,
    productOnePojo: new Product(),
    productTwoPojo: new Product()
  }

  buyBundle: Bundle = {
    bundleId: 0,
    bundleName: "",
    bundlePercentage: 0.0,
    productOnePojo: new Product(),
    productTwoPojo: new Product()
  }

  // searchQuery: string = "";

  // }

  searchQuery: string = "";
  
  constructor(
    private router: Router,
    private wishlistItemService: WishlistItemService,
    private formbuilder: FormBuilder,
    private productService: ProductService,
    private tokenService: TokenStorageService,
    private wishlistService: WishlistService,
    private cartAndItemsService: CartAndItemsService,
    private cartItemService: CartItemService,
    private cartService: CartService,
    private transactionService: TransactionService,
    private purchasedItemService: PurchasedItemService,
  private overlay: OverlayContainer) { }
  filteredProducts: Product[] = [];
  filteredDiscounts: ProductAndDiscount[] = [];
  filteredBundles: Bundle[] = [];
  filterFlag: boolean = false;
  hideFlag: boolean = false;
  discountOnlyFlag: boolean = false;
  // bundleOnlyFlag: boolean = false;


  ngOnInit(): void {
    //add code for the update

    this.userId = this.tokenService.getUser().user_id;
    this.loadDiscountedProducts();
    this.loadBundles();

    this.darkModeToggle.valueChanges.subscribe((darkMode) => {
      const darkClassName = 'darkMode';
      this.className = darkMode ? darkClassName : '';
      if (darkMode) {
        this.overlay.getContainerElement().classList.add(darkClassName);
      } else {
        this.overlay.getContainerElement().classList.remove(darkClassName);
      }
    });
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  //Load all all Products
  loadProducts() {
    this.productService.getAllProductsService().subscribe(
      (response) => {
        //Loop to remove duplicated products if theres a discount for it
        for (let index = 0; index < this.allDiscountProducts.length; index++) {
          for (let index2 = 0; index2 < response.length; index2++) {
            if (
              this.allDiscountProducts[index].productId ==
              response[index2].productId
            ) {
              this.indexArray[this.saveIndex] = index;
              response.splice(index2, 1);
            }
          }
        }
        this.allProducts = response;
      },
      (error) => {
        this.errorProductMsg = 'Unable to get allProducts - Try later';
      }
    );
  }

  //Loads all Discounts
  loadDiscountedProducts() {
    this.productService.getAllDiscountsProductsService().subscribe(
      (response) => {
        this.allDiscountProducts = response;
        this.loadProducts();
      },
      (error) => {
        this.errorProductMsg = 'Unable to get allDiscountProducts - Try later';
      }
    );
  }

  // Load Bundles
  loadBundles() {
    this.productService.getAllBundleProductsService().subscribe(
      (response: any) => {
        console.log(response);

        this.allBundles = response;
      },
      (error: any) => {
        this.errorProductMsg = "Unable to get allBundles - Try later";
      }
    )
  }

  // bundle
  goToBundle(bundleId?: number) {
    this.router.navigate(['bundle-page/' + bundleId]);
  }

  loadBundleCart() {
    this.productService.getAllBundleProductsService().subscribe({
      next: Response => {
        this.allBundles = Response;

      }
    })
  }


  goToProduct(productId: number) {
    this.router.navigate(['product-page/' + productId]);
  }

  loadCart() {
    this.cartAndItemsService
      .getCartAndItemsWithUserIdService(this.userId)
      .subscribe({
        next: (response) => {
          this.cartAndItems = response;
        },
        error: (error) => { },
      });
  }

  addToCart(productId: any) {
    let item = new CartItem();
    item.cartId = this.cartAndItems.cartId;
    item.productId = productId;
    item.cartQty = 1;
    item.cartItemId = -1;
    this.cartItemService.addNewItemService(item).subscribe({
      next: (response) => { },
      error: (error) => { },
    });
  }

  loadWishlist() {
    this.wishlistService.getWishlistService(this.userId).subscribe({
      next: (response) => {
        console.log(response);
        this.wishlist = response;
      },
      error: (error) => { },
    });
  }

  filterByCategory(categoryName: String) {

    this.filteredProducts = [];
    this.filteredDiscounts = [];
    this.filteredBundles = [];
    this.allProducts.forEach((product) => {
      if (product.productCategory == categoryName) { 
        this.filteredProducts.push(product)}
    });

    this.allDiscountProducts.forEach((product) => {
      if (product.productCategory == categoryName) { this.filteredDiscounts.push(product) }
    });
    //bundles
    this.allBundles.forEach((bundle) => {
      if (bundle.productOnePojo.productCategory == categoryName) { this.filteredBundles.push(bundle) }
    });
    this.discountOnlyFlag= false;
    // this.bundleOnlyFlag = false;
     this.hideFlag = false;
    this.filterFlag = true;
    sessionStorage.removeItem('searchQuery');
  }


  filterByDiscount() {
    sessionStorage.removeItem("searchQuery")
    // this.filterFlag = false;
    // this.hideFlag= false;
    // this.discountOnlyFlag= false;
    //  this.bundleOnlyFlag = false;

    this.discountOnlyFlag = true;
    this.filterFlag = false;
    this.filteredProducts = [];
    this.hideFlag = false;


  }

  //bundles
  filterByBundle() {
    sessionStorage.removeItem("searchQuery")

    // this.filterFlag = false;
    // this.hideFlag= false;
    // this.discountOnlyFlag= false;
    // this.bundleOnlyFlag = false;

    // this.bundleOnlyFlag = true;
    this.filterFlag = false;
    this.filteredBundles = [];
    this.hideFlag = true;
  }

  unfilter() {

    // this.filterFlag = false;
    // this.hideFlag= false;
    // this.discountOnlyFlag= false;
    // this.bundleOnlyFlag = false;

    this.filterFlag = false;
    this.filteredProducts = [];
    sessionStorage.removeItem('searchQuery');
    this.hideFlag = false;
    this.discountOnlyFlag = false;
    // this.bundleOnlyFlag = false;

  }

  returnQuery() {
    return sessionStorage.getItem('searchQuery');
  }

  searchedProducts(searched: string | null): Product[] {
    let returnedSet: Product[] = [];
    if (searched != null) {
      this.filterFlag = false;
      this.hideFlag = true;
      let searchString: string = searched.toLowerCase();
      this.allProducts.forEach((product) => {
        let lowercaseName: string = product.productName.toLowerCase();
        let lowercaseCategory: string = product.productCategory.toLowerCase();
        if (
          lowercaseName.includes(searchString) ||
          lowercaseCategory.includes(searchString)
        ) {
          returnedSet.push(product);
        }
      });
    }
    return returnedSet;
  }

  searchedDiscounts(searched: string | null): ProductAndDiscount[] {
    let returnedSet: ProductAndDiscount[] = [];
    if (searched != null) {
      this.filterFlag = false;
      this.hideFlag = true;
      let searchString: string = searched.toLowerCase();
      this.allDiscountProducts.forEach((product) => {
        let lowercaseName: string = product.productName.toLowerCase();
        let lowercaseCategory: string = product.productCategory.toLowerCase();
        if (
          lowercaseName.includes(searchString) ||
          lowercaseCategory.includes(searchString)
        ) {
          returnedSet.push(product);
        }
      });
    }
    return returnedSet;
  }

  proceedToCheckout(bundleId: number | undefined) {

    this.buyBundleCart.userId = this.tokenService.getUser().user_id;
    this.cartService.addCartService(this.buyBundleCart).subscribe({
      next: response => {  
        this.buyBundleCartAndItems.cartId = response.cartId;
        this.buyBundleCartAndItems.userId = response.userId;
        // add item1 to cart object in Angular
        this.buyBundleItem1.cartId = this.buyBundleCartAndItems.cartId;
        this.buyBundleItem1.cartQty = 1;
        this.buyBundleItem1.cartItemId = -1;
        // add item2 to cart object in Angulaer
        this.buyBundleItem2.cartId = this.buyBundleCartAndItems.cartId;
        this.buyBundleItem2.cartQty = 1;
        this.buyBundleItem2.cartItemId = -1;  
        this.productService.getAllBundleProductsService().subscribe({
          next: response => {
            for (let bundle of response){
              if (bundle.bundleId == bundleId){
              // Assign productId of items in bundle to the items in cart
              this.buyBundleItem1.productId = bundle.productOnePojo.productId;        
              this.buyBundleItem2.productId = bundle.productTwoPojo.productId;

              }
            }
            this.cartItemService.addNewItemService(this.buyBundleItem1).subscribe({
              // add item1 to cart in database => return cart item1 as response
              next: response => {
                this.cartItemService.addNewItemService(this.buyBundleItem2).subscribe({
                  // add item2 to cart in database => return cart item2 as response
                  next: response => {
                    this.cartAndItemsService.getCartAndItemsService(this.buyBundleCartAndItems.cartId).subscribe({
                      // load product information from database into cart
                      next: response => {
                        this.buyBundleCartAndItems.cartItems = response.cartItems; 
                        this.buyBundleCartAndItems.cartTotal = parseInt(this.getItemsTotal())*(1-this.buyBundle.bundlePercentage/100);
                        console.log(this.buyBundleCartAndItems.cartTotal);
                        // this is a soft removal of a cart from the database in order to maintain purchase history
                        this.buyBundleCartAndItems.cartRemoved = true;
                        this.buyBundleCartAndItems.cartPaid = true;
                        
                        this.cartService.updateCartService(this.buyBundleCartAndItems).subscribe ({
                          next: response => {
                            this.transaction.cartId = this.buyBundleCartAndItems.cartId;
                            this.transaction.transactionId = null;
                            this.transaction.transactionDate = null;
                            this.transactionService.sendTransaction(this.transaction).subscribe({
                              next: response => {
                                this.newTransaction = response;
                                this.updateMultiProducts();
                                this.addItemsToPurchaseHistory(response.transactionId);
                                this.intervalId = setInterval(() => {
                                  this.displayStyle = "none";
                                  this.router.navigate(['/confirmation-checkout/' + this.newTransaction.transactionId]);
                                }, 2000);
                              } 
                            });  
                          }
                        });
                      }
                    })
                    
                   
                    
                  }
                });
              }
            });
          }
        });        
      },
      error: (error) => { this.router.navigate(['login']); },

    });
  }

  getItemsTotal(): any {
    let total = 0;
    this.buyBundleCartAndItems.cartItems.forEach((value, index) => {
      total += this.calculateTotalCost(value, this.calculateDiscountedItemCost);
    });

    return total.toFixed(2);
  }

  calculateTotalCost(item: ItemProductAndDiscount, calcSingleItem: any) {
    return item.cartQty * calcSingleItem(item.productAndDiscount);
  }

  updateMultiProducts() {
    this.buyBundleCartAndItems.cartItems.forEach((item) => {
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
    console.log(this.buyBundleCartAndItems.cartItems);
    let purchasedItems: PurchasedItem[] = [];
    this.buyBundleCartAndItems.cartItems.forEach((item) => {
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
    
    this.purchasedItemService.addPurchasedItems(purchasedItems).subscribe({
      next: response => {

      },
      error: err => {

      }
    })
  }

  calculateDiscountedItemCost(product: ProductAndDiscount): number {
    let cost = product.productCost;
    let discountPercentage = product.discountPercentage;
    return cost - (cost * (discountPercentage / 100));
  }

  searchStore() {
    sessionStorage.setItem('searchQuery', this.searchQuery);
  }
}
