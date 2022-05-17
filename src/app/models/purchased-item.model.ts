import {Product} from "./product.model";

export class PurchasedItem {
  itemId: number = 0;
  transactionId: number = 0;
  userId: number = 0;
  cartId: number = 0;
  productId: number = 0;
  itemQty: number = 0;
  purchaseCost: number = 0.0;
  purchaseDate: any = new Date();
  //stuff I added
  imagesUrl: string = "";
  productSku: string = "";
  productCost: number = 0.0;
  productName: string = "";
  productDescription: string = "";
}

export class PurchasedItemProduct {
  itemId: number = 0;
  transactionId: number = 0;
  userId: number = 0;
  cartId: number = 0;
  productId: number = 0;
  itemQty: number = 0;
  purchaseCost: number = 0.0;
  purchaseDate: any = new Date();
  product: Product = new Product();
}
//Bundle Model
export class Bundle{

  bundleId?: number = 0;
  bundleName: string = "";
  bundlePercentage: number = 0.00;
  productOnePojo: Product= new Product();
  productTwoPojo: Product= new Product();


}
