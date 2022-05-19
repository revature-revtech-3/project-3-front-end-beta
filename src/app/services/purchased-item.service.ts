import { Injectable } from '@angular/core';
import {Instance} from "../models/Instance";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";
import {PurchasedItem, PurchasedItemProduct} from "../models/purchased-item.model";
import {Observable} from "rxjs";
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class PurchasedItemService {

  baseUrl = Instance.url + "/api/purchased-items";
  secbaseUrl = Instance.json;
  header = {};

  constructor(private http: HttpClient, tokenService: TokenStorageService) {
    this.header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${tokenService.getToken()}`)
    }
  }

  addPurchasedItems(items: PurchasedItem[]): Observable<boolean> {
    return this.http.post<boolean>(this.baseUrl + "/many/post", items, this.header);
  }

  getPurchasedItemsByTransaction(transactionId: number): Observable<PurchasedItemProduct[]> {
    return this.http.get<PurchasedItemProduct[]>(this.baseUrl + ("/transaction/" + transactionId  + "/get"), this.header)
  }

   getPurchasedItemsByUser(userId: number): Observable<PurchasedItemProduct[]> {
     return this.http.get<PurchasedItemProduct[]>(this.baseUrl + ("/user/" + userId  + "/get"), this.header)
   }

  getPurchasedItemsByOrder(cartId: number): Observable<PurchasedItemProduct[]> {
    return this.http.get<PurchasedItemProduct[]>(this.baseUrl + ("/order/" + cartId), this.header)
  }

  getOrderByUser(userId: number): Observable<Cart[]> {
    return this.http.get<Cart[]>(this.baseUrl + ("/order/user/" + userId), this.header)
  }


  getPurchasedItemsByMostSold(): Observable<PurchasedItem[]>{
return this.http.get<PurchasedItem[]>(this.baseUrl+("/purchasedItems"), this.header)
  }


  getTransactionIdBycId(cartId: number): Observable<number> {
    return this.http.get<number>(this.baseUrl + ("/order/tid/" + cartId), this.header)
  }

}
