import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./prisma";
import config from "./config";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: config.auth.google.clientId || "",
      clientSecret: config.auth.google.clientSecret || "",
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.credits = user.credits;
      }
      return session;
    },
  },
  secret: config.auth.secret,
  pages: {
    signIn: "/",
  },
};
