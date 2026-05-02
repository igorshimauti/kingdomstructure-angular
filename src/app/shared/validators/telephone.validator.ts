import { AbstractControl, ValidationErrors } from '@angular/forms';
import { normalizePhone } from '../utils/input-format.util';

export function telephoneValidator(control: AbstractControl): ValidationErrors | null {
  const value = String(control.value ?? '').trim();

  if (!value) {
    return null;
  }

  const phone = normalizePhone(value);

  if (phone.length !== 10 && phone.length !== 11) {
    return { telephoneInvalid: true };
  }

  return null;
}

