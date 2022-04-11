import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Instance } from '../models/Instance';
import { Wishlist } from '../models/wishlist.model';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  baseUrl = Instance.url + '/api/wishList';
  header = {};

  constructor(private http: HttpClient, tokenService: TokenStorageService) {
    this.header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${tokenService.getToken()}`
      ),
    };
  }

  addWishlistService(wishlist: Wishlist): Observable<Wishlist> {
    return this.http.post<Wishlist>(
      this.baseUrl + '/add/wishLists',
      wishlist,
      this.header
    );
  }

  getWishlistService(userId: number): Observable<Wishlist> {
    return this.http.get<Wishlist>(
      this.baseUrl + '/user/' + userId + '/get',
      this.header
    );
  }
}
