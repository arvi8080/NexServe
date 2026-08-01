/**
 * GlowHome Security Sanitizer & Input Protection Utilities
 * (OWASP Top 10 Standard)
 */

/**
 * Escapes HTML characters to prevent Cross-Site Scripting (XSS) attacks.
 */
export function sanitizeHtmlInput(input: string): string {
  if (!input) return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Detects suspicious SQL Injection patterns in user input.
 */
export function hasSqlInjectionPattern(input: string): boolean {
  if (!input) return false;
  const sqlRegex = /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|EXEC|UNION|CREATE|TRUNCATE)\b)|(--)|(\/\*)/i;
  return sqlRegex.test(input);
}

/**
 * Detects suspicious NoSQL Injection operator objects or strings ($where, $gt, etc.).
 */
export function hasNoSqlInjectionPattern(input: any): boolean {
  if (typeof input === 'object' && input !== null) {
    const keys = Object.keys(input);
    return keys.some((k) => k.startsWith('$'));
  }
  if (typeof input === 'string') {
    return input.includes('$where') || input.includes('$gt') || input.includes('$regex');
  }
  return false;
}

/**
 * Validates password complexity according to Argon2id / OWASP standards:
 * - Minimum 12 characters
 * - At least 1 Uppercase letter
 * - At least 1 Lowercase letter
 * - At least 1 Number
 * - At least 1 Special character
 */
export function validatePasswordComplexity(password: string): { isValid: boolean; errorMsg?: string } {
  if (!password || password.length < 12) {
    return { isValid: false, errorMsg: 'Password must be at least 12 characters long.' };
  }
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, errorMsg: 'Password must contain at least 1 uppercase letter.' };
  }
  if (!/[a-z]/.test(password)) {
    return { isValid: false, errorMsg: 'Password must contain at least 1 lowercase letter.' };
  }
  if (!/[0-9]/.test(password)) {
    return { isValid: false, errorMsg: 'Password must contain at least 1 number.' };
  }
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return { isValid: false, errorMsg: 'Password must contain at least 1 special character.' };
  }
  return { isValid: true };
}
