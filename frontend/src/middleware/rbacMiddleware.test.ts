import { describe, expect, it } from 'vitest';
import { rbacEngine } from './rbacMiddleware';

describe('rbacEngine', () => {
  it('redirects pending VENDOR accounts to verification pending', () => {
    const user = {
      id: 'vendor-1',
      email: 'vendor@example.com',
      role: 'VENDOR' as any,
      verificationStatus: 'PENDING',
    } as any;

    const result = rbacEngine.checkVendorVerification({
      user,
      isAuthenticated: true,
      vendor: null,
    });

    expect(result.authorized).toBe(false);
    expect(result.redirectUrl).toBe('/vendor/pending-verification');
  });
});
