import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: any = {
    username: null,
    email: null,
    password: null
  };
  
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  message = '';

  constructor(private authService: AuthService) { }

  onSubmit(): void {

    this.authService.register(this.form).subscribe({
      next: data => {
        this.message = data.message;
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.error;
        this.isSignUpFailed = true;
      }
    });

  }
}