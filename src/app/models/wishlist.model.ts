import { ProductAndDiscount } from "./product.model";

export class Wishlist {

    wishlistId: number = 0;
    userId: number = 0;
    wishlistTotal: number = 0;
   
}

export class WishlistItem {

    wishlistItemId: number = 0;
    wishlistId: number = 0;
    productId: number = 0;
    wishlistQty: number = 0;
}

export class WishlistAndItems {

    wishlistId: number = 0;
    userId: number = 0;
    wishlistTotal: number = 0;
    wishlistItems: Array<ItemProductAndDiscount> = [];
}

export class ItemProductAndDiscount {

    wishlistItemId: number = 0;
    wishlistId: number = 0;
    productId: number = 0;
    wishlistQty: number = 0;
    productAndDiscount: ProductAndDiscount = new ProductAndDiscount();
}
