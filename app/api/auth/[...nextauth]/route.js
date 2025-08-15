import NextAuthPkg from "next-auth/next";
import { authOptions } from "@/lib/auth";

const NextAuth = NextAuthPkg.default ?? NextAuthPkg;

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
