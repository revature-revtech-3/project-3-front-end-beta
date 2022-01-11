import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PurchasedItem } from "../../models/purchasedItem.model";

@Component({
  selector: 'app-confirmation-checkout',
  templateUrl: './confirmation-checkout.component.html',
  styleUrls: ['./confirmation-checkout.component.scss']
})
export class ConfirmationCheckoutComponent implements OnInit {

  purchasedItems: PurchasedItem[] = [];
  errorMsg: string = "";
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let transId = this.activatedRoute.snapshot.paramMap.get("sentTransaction");
    console.log("helooo")

    //   this.purchasedItems.purchasedItemservice(transId).subscribe((response) => {
    //     this.purchasedItems = response
    //   }, (error) => {
    //     this.errorMsg = 'There was some internal error! Please try again later!';
    //   })

  }
}
