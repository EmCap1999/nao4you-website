import { Component } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input-gg';
import { phoneNumberValidator } from './phone.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  form: FormGroup;

  // phone params instances
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  countriesList: CountryISO[] = [CountryISO.Belgium, CountryISO.France];

  // other
  isSuccessful: Boolean = false;
  isSignUpFailed: Boolean = false;
  message: String = '';

  constructor(private authService: AuthService, private router: Router) {
    this.form = new FormGroup({
      firstName: new FormControl(undefined, [Validators.required]),
      lastName: new FormControl(undefined, [Validators.required]),
      gender: new FormControl(undefined, [Validators.required]),
      email: new FormControl(undefined, [Validators.required, Validators.email]),
      password: new FormControl(undefined, [Validators.required, Validators.minLength(6)]),
      phone: new FormControl(undefined, [Validators.required, phoneNumberValidator()]),
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.authService.register(this.form.value).subscribe({
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
}
