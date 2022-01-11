import { Injectable } from '@angular/core';
import {Instance} from "../models/Instance";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";
import {Observable} from "rxjs";
import {ProductAndDiscount} from "../models/product.model";
import {Review} from "../models/review.model";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  baseUrl = Instance.url + "/api/reviews";
  header = {};

  constructor(private http: HttpClient, tokenService: TokenStorageService) {
    this.header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${tokenService.getToken()}`)
    }
  }

  postReview(review: Review): Observable<Review> {
    return this.http.post<Review>(this.baseUrl + "/post", review, this.header);
  }

  getReviews(productId: number): Observable<Review[]> {
    return this.http.get<Review[]>(this.baseUrl + "/all/" + productId+ "/get", this.header);
  }

}
