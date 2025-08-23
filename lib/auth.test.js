import { describe, it, expect, beforeEach } from 'vitest';
import { getUserRole } from './auth.js';

describe('getUserRole', () => {
  beforeEach(() => {
    process.env.ADMIN_IDS = '1,2';
  });

  it('returns superadmin when id is in ADMIN_IDS', () => {
    expect(getUserRole('1')).toBe('superadmin');
  });

  it('returns user when id is not in ADMIN_IDS', () => {
    expect(getUserRole('3')).toBe('user');
  });
});
