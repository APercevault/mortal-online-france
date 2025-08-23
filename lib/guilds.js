// Simple in-memory guild store and helpers

// Each guild has: id, description, banner, videos [{url, type}], admins [userIds]
const guilds = [
  {
    id: "1",
    description: "",
    banner: "",
    videos: [],
    admins: [],
  },
];

export function getGuild(id) {
  return guilds.find((g) => g.id === id);
}

export function updateGuild(id, data) {
  const guild = getGuild(id);
  if (!guild) return null;
  guild.description = data.description ?? guild.description;
  guild.banner = data.banner ?? guild.banner;
  if (Array.isArray(data.videos)) {
    guild.videos = data.videos;
  }
  return guild;
}

export function isGuildAdmin(id, userId) {
  const guild = getGuild(id);
  if (!guild) return false;
  return guild.admins.includes(userId);
}

export function addGuildAdmin(id, userId) {
  const guild = getGuild(id);
  if (!guild) return false;
  if (!guild.admins.includes(userId)) guild.admins.push(userId);
  return true;
}

export { guilds };
