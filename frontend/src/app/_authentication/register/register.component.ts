import { Component } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input-gg';
import { phoneNumberValidator } from './validators/phone.validator';
import { streetValidator } from './validators/address.validator';
import { regionValidator } from './validators/region.validator';
import { cityValidator } from './validators/city.validator';
import { postalCodeValidator } from './validators/postalCode.validator';
import { assetsUrl } from '../../config/assets.url';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  form: FormGroup;
  facebookUrl: string = assetsUrl.facebookUrl;
  logoUrl: string = assetsUrl.logoUrl

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
      address: new FormGroup({
        street: new FormControl(undefined, [Validators.required, streetValidator()]),
        country: new FormControl(undefined, [Validators.required]),
        region: new FormControl(undefined, [Validators.required, regionValidator()]),
        city: new FormControl(undefined, [Validators.required, cityValidator()]),
        postalCode: new FormControl(undefined, [Validators.required, postalCodeValidator()]),
      })
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
