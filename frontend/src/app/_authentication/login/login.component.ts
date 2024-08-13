import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null,
  };
  isLoggedIn: boolean = false;
  isLoginFailed: boolean = false;
  message: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.verifyToken().subscribe({
      next: (response) => {
        console.log(response);
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
      next: (response) => {
        console.log(response);
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
        this.resetForm();
      },
      error: (err) => {
        this.message = err.error.message;
      },
    });
  }

  resetForm(): void {
    this.form.email = null;
    this.form.password = null;
  }
}
