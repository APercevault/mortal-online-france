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
