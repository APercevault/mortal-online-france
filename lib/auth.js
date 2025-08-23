
import DiscordProviderImport from "next-auth/providers/discord";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma.js";

export function getUserRole(id) {
  const admins = process.env.ADMIN_IDS?.split(",") || [];
  return admins.includes(id) ? "superadmin" : "user";
  const superAdmins = process.env.SUPERADMIN_IDS?.split(",") || [];
  const guildAdmins = process.env.ADMIN_IDS?.split(",") || [];
  if (superAdmins.includes(id)) return "superadmin";
  if (guildAdmins.includes(id)) return "admin";
  return "user";
}

const DiscordProvider = DiscordProviderImport.default ?? DiscordProviderImport;

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        const role = getUserRole(account.providerAccountId);
        token.role = role;
        await prisma.user.update({
          where: { id: user.id },
          data: { role },
        });
      }
      return token;
    },
    async session({ session, token }) {
      if (token.sub) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.sub },
          include: { guildAdmins: true },
        });
        if (dbUser) {
          session.user.role = dbUser.role;
          session.user.guildAdmins = dbUser.guildAdmins.map((g) => ({
            guildId: g.guildId,
            role: "admin",
          }));
        }
      }
      return session;
    },
  },
};
