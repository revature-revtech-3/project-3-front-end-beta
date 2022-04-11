import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  public newPassword = '';
  public confirmPassword = '';
  private userid = 0;
  public isVerified = false;
  public isVerifyComplete = false;
  public isPwdChngSuccess = false;

  constructor(private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      this.authService.verifyToken(token).subscribe({
        next: (user) => {
          if (user) {
            this.userid = user.user_id;
            this.isVerified = true;
            this.isVerifyComplete = true;
          } else {
            this.isVerified = false;
            this.isVerifyComplete = true;
          }

        }
      });
    });
  }

  onSubmit() {
    this.authService.resetPassword(this.userid, this.newPassword).subscribe({
      next: () => {
        this.isPwdChngSuccess = true;
        this.newPassword = '';
        this.confirmPassword = '';
      },
      error: () => {
        this.isPwdChngSuccess = false;
      }
    });
  }


}

