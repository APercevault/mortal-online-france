import { describe, it, expect, beforeEach } from 'vitest';
import { getUserRole } from './roles.js';

describe('getUserRole', () => {
  beforeEach(() => {
    process.env.ADMIN_IDS = '1,2';
    process.env.SUPERADMIN_IDS = '3';
  });

  it('returns superadmin when id is in SUPERADMIN_IDS', () => {
    expect(getUserRole('3')).toBe('superadmin');
  });

  it('returns admin when id is in ADMIN_IDS', () => {
    expect(getUserRole('1')).toBe('admin');
  });

  it('returns user when id is not in ADMIN_IDS or SUPERADMIN_IDS', () => {
    expect(getUserRole('4')).toBe('user');
  });
});

