import { AbstractControl, ValidationErrors } from '@angular/forms';

export function cpfValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  if (!value) {
    return null;
  }

  const cpf = value.replace(/\D/g, '');

  if (cpf.length !== 11) return { cpfInvalid: true };

  if (/^(\d)\1{10}$/.test(cpf)) return { cpfInvalid: true };

  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(9))) return { cpfInvalid: true };

  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(10))) return { cpfInvalid: true };

  return null;
}
