import { Component, HostBinding } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'rev-tech';
  USER_KEY = 'auth-user';

  //Angualr Material
  @HostBinding('class') className = '';

  toggleControl = new FormControl(false);


  constructor(private tokenstorage: TokenStorageService) {
    if (window.sessionStorage.getItem(this.USER_KEY)!=null){
     this.tokenstorage.isLoggedIn=true;
    }   
  }

  //Angualr Material
  ngOnInit() : void {
    this.toggleControl.valueChanges.subscribe(val => {
      this.className = val ? 'darkMode' : '';
    });
  }
}

