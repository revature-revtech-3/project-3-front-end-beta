import { Component, OnInit } from '@angular/core';
import {PurchasedItemProduct} from "../../models/purchased-item.model";
import {ActivatedRoute, Router} from "@angular/router";
import {PurchasedItemService} from "../../services/purchased-item.service";
import {TokenStorageService} from "../../services/token-storage.service";
import { Cart } from 'src/app/models/cart.model';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  purchasedItemProduct: PurchasedItemProduct[] = [];
  userOrder: Cart[] = [];
  errorMsg: string = "";
  transId: any = 0;
  cId: any = 0;
  userId: number = 0;

  constructor(private activatedRoute: ActivatedRoute,
              private purchasedItemService: PurchasedItemService,
              private tokenService: TokenStorageService,
              private router: Router,
  ) { }
  

  ngOnInit(): void {
    this.userId = this.tokenService.getUser().user_id;
    // this.loadItems();
    this.loadOrders();
  }


  loadItems() {
    this.purchasedItemService.getPurchasedItemsByUser(this.userId).subscribe((response) => {
      this.purchasedItemProduct = response;
      console.log(this.purchasedItemProduct)
  // loadItems() {
  //   this.purchasedItemService.getPurchasedItemsByUser(this.userId).subscribe((response) => {
  //     this.purchasedItemProduct = response;
  //     console.log(this.purchasedItemProduct)
  //   }, error => {
  //     this.errorMsg = 'There was some internal error! Please try again later!';
  //   });
  // }

    loadOrders() {
    this.purchasedItemService.getOrderByUser(this.userId).subscribe((response) => {
      this.userOrder= response.reverse();
      console.log(this.userOrder);
      console.log(this.userOrder[0].cartId);
    }, error => {
      this.errorMsg = 'There was some internal error! Please try again later!';
    });
  }

  // loadtId(cId: any) {
  //   this.purchasedItemService.getTransactionIdBycId(this.cId).subscribe((response) => {
  //     this.transId= response;
  //     console.log(this.transId);
  //     return this.transId;
  //   }, error => {
  //     this.errorMsg = 'There was some internal error! Please try again later!';
  //   });
  // }

  preview(event: any) {
    this.router.navigate(['/order-details/' + event.target.attributes.id.nodeValue])
  }
}
