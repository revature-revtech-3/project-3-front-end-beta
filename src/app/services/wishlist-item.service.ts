import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Instance } from '../models/Instance';
import { WishlistItem } from '../models/wishlist.model';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class WishlistItemService {
  getWishlistAndItemsWithUserIdService() {
    throw new Error('Method not implemented.');
  }

  baseUrl = Instance.url + '/api/wishList-items';
  header = {};

  constructor(private http: HttpClient, tokenService: TokenStorageService) {
    this.header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${tokenService.getToken()}`
      ),
    };
  }

  addNewItemServiceWishlist(item: WishlistItem): Observable<WishlistItem> {
    return this.http.post<WishlistItem>(
      this.baseUrl + '/add/items',
      item,
      this.header
    );
  }

  removeItemServiceWishlist(wishListItemId: number): Observable<boolean> {
    return this.http.delete<boolean>(
      this.baseUrl + '/' + wishListItemId + '/delete',
      this.header
    );
  }
}
