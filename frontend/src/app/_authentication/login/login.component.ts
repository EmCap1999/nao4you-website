import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { FB_URL } from '../../../../config';

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
  facebook: string = FB_URL;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.verifyToken().subscribe({
      next: () => {
        this.isLoggedIn = true;
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.message = err.error.message;
        this.isLoggedIn = false;
      },
    });
  }

  onSubmit(): void {
    this.authService.login(this.form).subscribe({
      next: () => {
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.message = err.error.message;
        this.isLoginFailed = true;
      },
    });
  }
}
