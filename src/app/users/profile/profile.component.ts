import { Component, OnInit } from '@angular/core';
import { PurchasedItemProduct } from 'src/app/models/purchased-item.model';
import { User, UserSettings } from 'src/app/models/user.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import { PurchasedItemService } from '../../services/purchased-item.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  purchasedItemProduct: PurchasedItemProduct[] = [];
  userId: number = 0;

  form: any = {
    first_name: null,
    last_name: null,
    username: null,
    email: null,
    password: null,
    address: null, 
    userImage: null,
    contact: null,
    imageUrl: null
  }
​
  editUserSettings: UserSettings = {
    user_settings_id:  0,
    user_id:  0,
    css_mode: "",
    email_notifications: true
  }


  editUser: User ={
    user_id: 0,
    email: '',
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    address: '',
    userType: '',
    contact: '',
    imageUrl: '',
    userRemoved: false,
    userSettings: this.editUserSettings
  }
  private roles: string[] = [];
  isLoggedIn = false;
  username?: string;
  first_name?: string;
  last_name?: string;
  password?: string;
  email?: string;
  address?: string;
  contact?: string;
  userImage?: string;
  showAdmin = false;
  currentUser: any;  
  flag: boolean = false;
  errorMsg = "";
  

  constructor(private token: TokenStorageService, private purchasedItemService: PurchasedItemService, private userService: UserService, private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
    this.userId = this.token.getUser().user_id;
    this.loadItems();
    this.isLoggedIn = !!this.token.getToken();
    if (this.token.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.token.getUser().roles;
      this.currentUser = this.token.getUser();
    }
    if (this.isLoggedIn) {
      const user = this.token.getUser();
      this.roles = user.roles;
      this.username = user.username;
      this.email = user.email;
      this.first_name = user.first_name;
      this.last_name = user.last_name;
      this.address = user.address;
      this.contact = user.contact;
      this.userImage = user.userImage;
      this.password = user.password;
​


      this.showAdmin = this.roles.includes('ROLE_ADMIN');
    }
    this.editUser.user_id = this.currentUser.user_id;
    this.editUser.password = this.currentUser.password;
    this.currentUser = this.token.getUser();
  }

  // getuserInfo() {
  //   this.userService.getUserInfo(Number(sessionStorage.getItem("userId"))).subscribe(
  //     (response) => {
  //       this.mainUser = response;
  //       this.editUser.userId = response.id;
  //       this.editUser.userEmail = response.email;
  //       this.editUser.userPassword = response.password;
  //       console.log(response);
  //     },
  //     (error) => {
  //       console.log(error);
  //       this.errorMsg = "ERROR GETTING USER INFOMATION!!!";
  //     }
  //   );
  // }
  
  toggleAdd(){
    if(this.flag){
      this.flag = false;
    }else{
      this.flag = true;
    }
  }

  updatedUser(){
    this.userService.updateUserService(this.editUser).subscribe(
      (response) => {
     this.currentUser = response      
      },
    (error)=> {
      }
    );
  }

  uploadUserImage(imageInput: any) {
    const reader = new FileReader();
    this.fileUploadService.onUpload(imageInput.target.files[0]).subscribe({
      next: async (response) => {
        this.form.userImage = response;  
        this.currentUser.imageUrl = response;     
      },
      error: err => {
      }
    })

  }

  loadItems() {
    this.purchasedItemService.getPurchasedItemsByUser(this.userId).subscribe((response) => {
      this.purchasedItemProduct = response;
    }, error => {
      this.errorMsg = 'There was some internal error! Please try again later!';
    });
  }

  calculateCost() {
    let totalCost = 0;
    this.purchasedItemProduct.forEach(item => {
      totalCost += (item.purchaseCost * item.itemQty);
    });
    return totalCost;
  }


/* reloadPage(): void{
    window.location.reload();} */
}