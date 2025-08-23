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
const guilds = [
  { id: '1', name: 'Example Guild', status: 'pending', authorId: '1' },
];

const guildAdmins = new Map();
const userNotifications = new Map();

export function getPendingGuilds() {
  return guilds.filter((g) => g.status === 'pending');
import { randomUUID } from "crypto";

export const guilds = [
  {
    id: "1",
    slug: "mof",
    name: "Mortal Online France",
    description: "Community guild for French players.",
    votes: {}, // userId -> rating
    comments: [],
  },
  {
    id: "2",
    slug: "knights",
    name: "Knights of Nave",
    description: "Honorable defenders of Nave.",
    votes: {},
    comments: [],
  },
];

export function getGuildBySlug(slug) {
  return guilds.find((g) => g.slug === slug);
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

export function addVote(guildId, userId, rating) {
  const guild = getGuildById(guildId);
  if (!guild) return null;
  guild.votes[userId] = rating;
  return guild;
}

export function getAverageRating(guild) {
  const values = Object.values(guild.votes);
  if (values.length === 0) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

export function addComment(guildId, userId, content) {
  const guild = getGuildById(guildId);
  if (!guild) return null;
  const comment = {
    id: randomUUID(),
    userId,
    content,
    createdAt: Date.now(),
  };
  guild.comments.unshift(comment);
  return comment;
}

export function getComments(guildId, page = 1, limit = 10) {
  const guild = getGuildById(guildId);
  if (!guild) return null;
  const start = (page - 1) * limit;
  const comments = guild.comments.slice(start, start + limit);
  return { comments, total: guild.comments.length };
}
