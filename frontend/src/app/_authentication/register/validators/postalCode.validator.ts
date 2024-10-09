
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function postalCodeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        const valid = /^(?:\d{4}|\d{5})$/.test(value);
        return value && !valid ? { invalidPostalCode: true } : null;
    };
}
