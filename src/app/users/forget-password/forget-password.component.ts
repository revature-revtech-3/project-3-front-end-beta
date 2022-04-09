import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

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

  submit() {
    this.authService.forgetPassword(this.email).subscribe({
      next: data => {
        this.isComplete = true;
        this.isError = false;
        this.email = '';
      },
      error: err => {
        this.isComplete = true;
        this.isError = true;
      }
    })

  }

}

