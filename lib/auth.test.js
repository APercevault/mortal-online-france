import { describe, it, expect, beforeEach } from 'vitest';
import { getUserRole } from './roles.js';
import { authOptions } from './auth.js';

describe('getUserRole', () => {
  beforeEach(() => {
    process.env.ADMIN_IDS = '1,2';
    process.env.SUPERADMIN_IDS = '3';
  });

  it('returns superadmin when id is in SUPERADMIN_IDS', () => {
    expect(getUserRole('3')).toBe('superadmin');
  });

  it('returns superadmin for default superadmin id when env is empty', () => {
    process.env.SUPERADMIN_IDS = '';
    expect(getUserRole('112288484521172992')).toBe('superadmin');
  });

  it('returns admin when id is in ADMIN_IDS', () => {
    expect(getUserRole('1')).toBe('admin');
  });

  it('returns user when id is not in ADMIN_IDS or SUPERADMIN_IDS', () => {
    expect(getUserRole('4')).toBe('user');
  });
});

describe('authOptions signIn', () => {
  it('adds a slugified name based on email', async () => {
    const user = { email: 'Test.User@example.com' };
    const result = await authOptions.callbacks.signIn({ user });
    expect(result).toBe(true);
    expect(user.name).toBe('test-user');
  });
});

