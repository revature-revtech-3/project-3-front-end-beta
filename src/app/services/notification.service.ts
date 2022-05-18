import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Instance } from '../models/Instance';
import { TokenStorageService } from '../services/token-storage.service';
import { NotificationList, NotificationListItem } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  baseUrl = Instance.url + '/api/Notification';
  header = {}

  constructor(private http: HttpClient, tokenService: TokenStorageService) {
    this.header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${tokenService.getToken()}`
      ),
    };
   }

   addNotificationService(notification: Notification): Observable<NotificationList> {
    return this.http.post<NotificationList>(
      this.baseUrl + '/add/notificationlist', notification, this.header);
   }

   getNotificationService(userId: number): Observable<NotificationList> {
     return this.http.get<NotificationList>(
       this.baseUrl + '/user/' + userId + '/get',
       this.header);
   }

   
}
