import { Product, ProductAndDiscount } from "./product.model";
import { User } from "./user.model";

export class NotificationList {

    notificationListId: number =0;
    userPojo: User = new User();
    notificationListTotal: number = 0;
    notificationItems: Array<NotificationListItem> = [];
    
}

export class NotificationListItem {

    notificationItemId: number = 0;
    notificationListPojo: NotificationList = new NotificationList();
    productAndDiscountPojo: ProductAndDiscount = new ProductAndDiscount();

}