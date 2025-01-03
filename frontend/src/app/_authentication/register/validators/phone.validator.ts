import { AbstractControl, ValidatorFn } from '@angular/forms';
import * as libphonenumber from 'libphonenumber-js';

export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const phoneNumber = control.value;
    if (phoneNumber) {
      const parsedPhoneNumber = libphonenumber.parsePhoneNumberFromString(phoneNumber.e164Number);
      if (!parsedPhoneNumber || !parsedPhoneNumber.isValid()) {
        return { validatePhoneNumber: true };
      }
    }
    return null;
  };
}
