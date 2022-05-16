import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Instance } from './models/Instance';
import { TokenStorageService } from './services/token-storage.service';

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


   removeItemServiceNotificationList(notificationItemId: number): Observable<boolean> {
    return this.http.delete<boolean>(
      this.baseUrl + '/' + notificationItemId + '/delete',
      this.header
    );
  }
}
