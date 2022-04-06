import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Instance } from '../models/Instance';
import { WishlistAndItems } from '../models/wishlist.model';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistAndItemsService {

  baseUrl = Instance.url + "/api/wishList-and-items";
  header = {};

  constructor(private http: HttpClient, tokenService: TokenStorageService) { 
    this.header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${tokenService.getToken()}`)
    }
   }

   getWishlistAndItemsService(wishlistId: number): Observable<WishlistAndItems>{
    return this.http.get<WishlistAndItems>(this.baseUrl + "/wishList/" + wishlistId + "/get", this.header);
  }

  // getWishlistAndItemsWithUserIdService(userId: number): Observable<WishlistAndItems> {
  //   return this.http.get<WishlistAndItems>(this.baseUrl + "/user/" + userId + "/get", this.header);
  // }





  }

