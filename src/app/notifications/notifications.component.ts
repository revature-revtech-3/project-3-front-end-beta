import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { NotificationList, NotificationListItem } from '../models/notification.model';
import { ProductAndDiscount } from '../models/product.model';
import { NotificationItemService } from '../services/notification-item.service';
import { NotificationService } from '../services/notification.service';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  productAndDiscount: ProductAndDiscount = new ProductAndDiscount();

  notificationList: NotificationList = new NotificationList();
  userId: number = 0;
  notification: any;
  errorMsg: string = '';

  constructor(
    private notificationService: NotificationService,
    private notificationItemService: NotificationItemService,
    private tokenService: TokenStorageService,
   
  ) { }

  ngOnInit(): void {
    this.userId = this.tokenService.getUser().user_id;
    if (this.userId <= 0) this.userId = 1; //Remove this line if not testing
    this.displayAllNotificationLists();
  }

  displayAllNotificationLists() {
    this.notificationService.getNotificationService(this.userId).subscribe(
      (response) => {
        console.log(response);
        this.notificationList = response;
        
      },
      (error) => {
        this.errorMsg =
          'There was some internal error! Please try again later!';
      }
    );
  }

  remove(notificationListItemId: number) {
    this.notificationItemService
      .removeItemServiceNotificationList(notificationListItemId)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.displayAllNotificationLists();
        },
        error: (err) => {},
      });
  }




}
