/** Bangladesh mobile: 11 digits, starts with 01, operator digit 3–9 */
export const BD_MOBILE_REGEX = /^01[3-9]\d{8}$/;

export function normalizeDigits(value: string) {
  return value.trim().replace(/\s/g, "");
}

export function validateBdMobile(value: string): string | null {
  const v = normalizeDigits(value);
  if (!v) return "Mobile number is required.";
  if (!BD_MOBILE_REGEX.test(v)) {
    return "Enter a valid Bangladesh mobile (11 digits, e.g. 01712345678).";
  }
  return null;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateEmailOrPhone(value: string): string | null {
  const raw = value.trim();
  if (!raw) return "Email or phone number is required.";
  const asPhone = normalizeDigits(raw);
  if (BD_MOBILE_REGEX.test(asPhone)) return null;
  if (EMAIL_REGEX.test(raw)) return null;
  return "Enter a valid email or Bangladesh mobile number.";
}

export function validatePassword(value: string, min = 8): string | null {
  if (!value) return "Password is required.";
  if (value.length < min) return `Password must be at least ${min} characters.`;
  return null;
}

export function validateFullName(value: string): string | null {
  const v = value.trim();
  if (!v) return "Full name is required.";
  if (v.length < 2) return "Please enter your full name.";
  return null;
}

export function validateAddress(value: string): string | null {
  const v = value.trim();
  if (!v) return "Address is required.";
  if (v.length < 5) return "Please enter a complete address.";
  return null;
}
