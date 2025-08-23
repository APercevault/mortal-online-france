import { describe, it, expect, beforeEach } from 'vitest';
import { getUserRole } from './auth.js';

  describe('getUserRole', () => {
    beforeEach(() => {
      process.env.ADMIN_IDS = '1,2';
      process.env.SUPERADMIN_IDS = '99';
    });

    it('returns admin when id is in ADMIN_IDS', () => {
      expect(getUserRole('1')).toBe('admin');
    });

    it('returns user when id is not in ADMIN_IDS', () => {
      expect(getUserRole('3')).toBe('user');
    });

    it('returns superadmin when id is in SUPERADMIN_IDS', () => {
      expect(getUserRole('99')).toBe('superadmin');
    });
  });
