import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PurchasedItemProduct } from 'src/app/models/purchased-item.model';
import { PurchasedItemService } from 'src/app/services/purchased-item.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  cId: any = 0;
  tId: any = 0;
  total: any = 0;
  itemsAmt: any = 0;
  datepurchased: any = new Date();
  purchasedItemProduct: PurchasedItemProduct[] = [];
  errorMsg: string = "";
  
  constructor(private activatedRoute: ActivatedRoute, private purchasedItemService: PurchasedItemService) { }

  ngOnInit(): void {
    this.cId = this.activatedRoute.snapshot.paramMap.get("orderSelected");
    this.loadItems(this.cId);
  }

  loadItems(cId: any) {
    this.purchasedItemService.getPurchasedItemsByOrder(this.cId).subscribe((response) => {
      this.purchasedItemProduct = response;
      this.tId = this.purchasedItemProduct[0].transactionId;
      this.datepurchased = this.purchasedItemProduct[0].purchaseDate;
      for (let i = 0; i < this.purchasedItemProduct.length; i++) {
        let amt = this.purchasedItemProduct[i].itemQty;
        this.itemsAmt = this.itemsAmt + amt;
      }
      for (let i = 0; i < this.purchasedItemProduct.length; i++) {
        let amt = this.purchasedItemProduct[i].purchaseCost;
        this.total = this.total + amt;
      }
      console.log(this.purchasedItemProduct)
    }, error => {
      this.errorMsg = 'There was some internal error! Please try again later!';
    });
  }

}
