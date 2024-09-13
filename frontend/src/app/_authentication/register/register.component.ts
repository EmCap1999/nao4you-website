import { Component } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  message = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.authService.register(this.form).subscribe({
      next: (data) => {
        this.message = data.message;
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 7000);
      },
      error: (err) => {
        this.message = err.error.message;
        this.isSignUpFailed = true;
      },
    });
  }
}
