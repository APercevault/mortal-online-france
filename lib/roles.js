export function getUserRole(id) {
  const superAdmins = process.env.SUPERADMIN_IDS?.split(',') || [];
  const admins = process.env.ADMIN_IDS?.split(',') || [];
  if (superAdmins.includes(id)) return 'superadmin';
  if (admins.includes(id)) return 'admin';
  return 'user';
}

