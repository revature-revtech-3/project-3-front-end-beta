import { Product } from "./product.model";


export class PurchasedItem {
    transactionItemId: any = 0;
    transactionId: number = 0;
    userId: number = 0;
    cartId: number = 0;
    productId: number = 0;
    itemQty: number = 0;
    purchaseCost: number = 0;
    purchaseDate: any;
    product: Product = new Product();
}