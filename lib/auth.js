
import DiscordProviderImport from "next-auth/providers/discord";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma.js";
import { getUserRole } from "./roles.js";

const DiscordProvider = DiscordProviderImport.default ?? DiscordProviderImport;

function slug(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const authOptions = {
  debug: process.env.NODE_ENV !== "production",
  pages: {
    error: "/auth/error",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user }) {
      try {
        if (!user.name && user.email) {
          const localPart = user.email.slice(0, user.email.indexOf("@"));
          user.name = slug(localPart);
        }
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
    async jwt({ token, account, user }) {
      try {
        if (account && user) {
          const role = getUserRole(account.providerAccountId);
          token.role = role;
          await prisma.user.update({
            where: { id: user.id },
            data: { role },
          });
        }
        if (token.sub) {
          const dbUser = await prisma.user.findUnique({ where: { id: token.sub } });
          if (dbUser) token.role = dbUser.role;
        }
      } catch (error) {
        console.error("Error in jwt callback:", error);
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      session.user.id = token.sub;
      return session;
    },
  },
};
