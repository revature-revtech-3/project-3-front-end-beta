export class Product {

    productId: number = 0;
    productSku: string = "";
    productName: string = "";
    productDescription: string = "";
    productCategory: string = "";
    productCost: number = 0.0;
    productQty: number = 0;
    imageUrl: string = "";
    productRemoved: boolean = false;
}

export class ProductAndDiscount {

    productId: number = 0;
    productSku: string = "";
    productName: string = "";
    productDescription: string = "";
    productCategory: string = "";
    productCost: number = 0.0;
    productQty: number = 0;
    imageUrl: string = "";
    productRemoved: boolean = false;
    discountId: number = 0;
    discountDescription: string = "";
    discountPercentage: number = 0;
}

//Discount Model
export class Discount{

    discountId: number = 0;
    productId: number = 0;
    discountDescription: string = "";
    discountPercentage: number = 0.0;
}


//Bundle Model
export class Bundle{

    bundleId?: number = 0;
    bundleName: string = "";
    bundlePercentage: number = 0.00;
    productOnePojo: Product= new Product();
    productTwoPojo: Product= new Product();
    

}

