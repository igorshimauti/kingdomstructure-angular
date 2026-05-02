export function extractDigits(value: unknown): string {
  return String(value ?? '').replace(/\D/g, '');
}

export function normalizeCpf(value: unknown): string {
  return extractDigits(value).slice(0, 11);
}

export function normalizePhone(value: unknown): string {
  return extractDigits(value).slice(0, 11);
}

export function formatPhone(value: unknown): string {
  const digits = normalizePhone(value);

  if (!digits) {
    return '';
  }

  if (digits.length <= 2) {
    return `(${digits}`;
  }

  const ddd = digits.slice(0, 2);
  const phoneNumber = digits.slice(2);

  if (digits.length <= 10) {
    if (phoneNumber.length <= 4) {
      return `(${ddd}) ${phoneNumber}`;
    }

    return `(${ddd}) ${phoneNumber.slice(0, 4)}-${phoneNumber.slice(4)}`;
  }

  if (phoneNumber.length <= 5) {
    return `(${ddd}) ${phoneNumber}`;
  }

  return `(${ddd}) ${phoneNumber.slice(0, 5)}-${phoneNumber.slice(5)}`;
}

export function formatCpf(value: unknown): string {
  const digits = normalizeCpf(value);

  if (!digits) {
    return '';
  }

  if (digits.length <= 3) {
    return digits;
  }

  if (digits.length <= 6) {
    return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  }

  if (digits.length <= 9) {
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  }

  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
}
