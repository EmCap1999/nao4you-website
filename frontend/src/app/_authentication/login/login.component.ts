import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { assetsUrl } from '../../config/assets.url';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn: boolean = false;
  isLoginFailed: boolean = false;
  message: string = '';
  facebookUrl: string = assetsUrl.facebookUrl;
  logoUrl: string = assetsUrl.logoUrl;

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
