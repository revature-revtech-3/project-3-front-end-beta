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
  purchasedItemProduct: PurchasedItemProduct[] = [];
  errorMsg: string = "";
  
  constructor(private activatedRoute: ActivatedRoute, private purchasedItemService: PurchasedItemService) { }

  ngOnInit(): void {
    this.cId = this.activatedRoute.snapshot.paramMap.get("orderSelected");
    this.loadItems();
  }

  loadItems() {
    this.purchasedItemService.getPurchasedItemsByOrder(this.cId).subscribe((response) => {
      this.purchasedItemProduct = response;
    }, error => {
      this.errorMsg = 'There was some internal error! Please try again later!';
    });
  }

}
