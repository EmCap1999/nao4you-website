import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn: boolean = false;
  isLoginFailed: boolean = false;
  user: string = '';
  message: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.verifyToken().subscribe({
      next: (res) => {
        this.user = res.userInfo;
        this.isLoggedIn = true;
      },
      error: (err) => {
        this.message = err.error.message;
        this.isLoggedIn = false;
      },
    });
  }

  onSubmit(): void {
    this.authService.login(this.form).subscribe({
      next: (res) => {
        this.user = res.userInfo;
        this.isLoginFailed = false;
        this.isLoggedIn = true;
      },
      error: (err) => {
        this.message = err.error.message;
        this.isLoginFailed = true;
      },
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.isLoggedIn = false;
        this.form = {}
      },
      error: (err) => {
        this.message = err.error.message;
      },
    });
  }
  
}
