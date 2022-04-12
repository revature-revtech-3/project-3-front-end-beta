import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  public email = '';
  public isComplete = false;
  public isError = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  submit(formObj: any) {
    this.authService.forgetPassword(this.email).subscribe({
      next: () => {
        this.isComplete = true;
        this.isError = false;
        formObj.reset(); // to clear the values


      },
      error: () => {
        this.isComplete = true;
        this.isError = true;
      }
    })

  }

}

