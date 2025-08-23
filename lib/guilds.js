const guilds = [
  { id: '1', name: 'Example Guild', status: 'pending', authorId: '1' },
];

const guildAdmins = new Map();
const userNotifications = new Map();

export function getPendingGuilds() {
  return guilds.filter((g) => g.status === 'pending');
}

export function getGuildById(id) {
  return guilds.find((g) => g.id === id);
}

export function updateGuildStatus(id, status) {
  const guild = getGuildById(id);
  if (guild) guild.status = status;
  return guild;
}

export function addGuildAdmin(guildId, userId) {
  if (!guildAdmins.has(guildId)) guildAdmins.set(guildId, new Set());
  guildAdmins.get(guildId).add(userId);
}

export function notifyUser(userId, message) {
  if (!userNotifications.has(userId)) userNotifications.set(userId, []);
  userNotifications.get(userId).push(message);
}

export function getUserNotifications(userId) {
  return userNotifications.get(userId) ?? [];
}
