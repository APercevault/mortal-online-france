
import DiscordProviderImport from "next-auth/providers/discord";

export function getUserRole(id) {
  const superAdmins = process.env.SUPERADMIN_IDS?.split(",") || [];
  const guildAdmins = process.env.ADMIN_IDS?.split(",") || [];
  if (superAdmins.includes(id)) return "superadmin";
  if (guildAdmins.includes(id)) return "admin";
  return "user";
}

const DiscordProvider = DiscordProviderImport.default ?? DiscordProviderImport;

export const authOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, profile }) {
      if (profile) {
        token.role = getUserRole(profile.id);
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
};
