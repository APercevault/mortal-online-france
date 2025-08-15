import DiscordProvider from "next-auth/providers/discord";

export function getUserRole(id) {
  const admins = process.env.ADMIN_IDS?.split(",") || [];
  return admins.includes(id) ? "admin" : "user";
}

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
