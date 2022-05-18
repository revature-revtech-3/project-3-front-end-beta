import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Instance } from '../models/Instance';
import { Productdata } from '../models/productdata.model';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminSalesService {

  baseUrl = Instance.url + "/api/purchased-items";
  header= {};

  constructor(private http: HttpClient, tokenService: TokenStorageService){
    this.header={
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${tokenService.getToken}`)
    }

  }

  PurchasedItemsQty(): Observable<Productdata[]> {
    return this.http.get<Productdata[]>(this.baseUrl + "/admin/trackpurchases", this.header);
  }

  PurchasedItemsCost(): Observable<Productdata[]> {
    return this.http.get<Productdata[]>(this.baseUrl + "/admin/tracksales", this.header);
  }

  PurchasedItemsTotalCost(): Observable<Productdata[]> {
    return this.http.get<Productdata[]>(this.baseUrl + "/admin/sum", this.header);
  }

}
