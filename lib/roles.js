const DEFAULT_SUPERADMINS = ['112288484521172992'];

export function getUserRole(id) {
  const superAdmins = new Set([
    ...(process.env.SUPERADMIN_IDS?.split(',').filter(Boolean) ?? []),
    ...DEFAULT_SUPERADMINS,
  ]);
  const admins = process.env.ADMIN_IDS?.split(',').filter(Boolean) ?? [];
  if (superAdmins.has(id)) return 'superadmin';
  if (admins.includes(id)) return 'admin';
  return 'user';
}

