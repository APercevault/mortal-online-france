
import DiscordProviderImport from "next-auth/providers/discord";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma.js";
import { getUserRole } from "./roles.js";

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
      if (token.sub) {
        const dbUser = await prisma.user.findUnique({ where: { id: token.sub } });
        if (dbUser) token.role = dbUser.role;
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
