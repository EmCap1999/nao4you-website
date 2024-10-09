import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function cityValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        const valid = /^[0-9a-zA-Z\s\-]+$/.test(value);
        return value && !valid ? { invalidCity: true } : null;
    };
}