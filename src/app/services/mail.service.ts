import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Instance } from '../models/Instance';


@Injectable({
  providedIn: 'root'
})
export class MailService {
  baseUrl = Instance.url + "/api";
  header = {};
  constructor(private http: HttpClient) { }

  email(userId: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + "/enotif/" + userId, this.header);
  }
}
