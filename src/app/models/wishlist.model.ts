import { Product, ProductAndDiscount } from "./product.model";
import { User } from "./user.model";

export class Wishlist {

    wishListId: number =0;
    userPojo: User = new User();
    wishListTotal: number = 0;
    wishListItems: Array<WishlistItem> = [];
    
}

export class WishlistItem {

    wishItemId: number = 0;
    wishListPojo: Wishlist = new Wishlist();
    productAndDiscountPojo: ProductAndDiscount = new ProductAndDiscount();

}
