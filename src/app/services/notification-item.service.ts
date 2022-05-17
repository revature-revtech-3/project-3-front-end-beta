import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Instance } from '../models/Instance';
import { NotificationListItem } from '../models/notification.model';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationItemService {

  baseUrl = Instance.url + '/api/notification-item';
  header = {};

  
  constructor(private http: HttpClient, tokenService: TokenStorageService) {
    this.header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${tokenService.getToken()}`
      ),
    };
   }

   addNewItemServiceNotificationList(item: NotificationListItem): Observable<NotificationListItem> {
    return this.http.post<NotificationListItem>(
      this.baseUrl + '/add/items',
      item,
      this.header
    );
  }

   removeItemServiceNotificationList(notificationItemId: number): Observable<boolean> {
    return this.http.delete<boolean>(
      this.baseUrl + '/' + notificationItemId + '/delete',
      this.header
    );
  }
}
