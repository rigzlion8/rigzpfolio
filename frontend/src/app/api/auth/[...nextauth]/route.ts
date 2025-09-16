import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import type { NextAuthOptions } from "next-auth";
import clientPromise from "@/lib/mongodb";

const providers: NextAuthOptions["providers"] = [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  }),
];

// Add GitHub provider only if credentials are provided
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  providers.push(
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    })
  );
}

const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers,
  callbacks: {
    session: async ({ session, user }) => {
      return {
        ...session,
        user: {
          ...(session.user || {}),
          id: (user as { id: string }).id,
        },
      };
    },
  },
  pages: {
    signIn: "/signin",
  },
});

export { handler as GET, handler as POST };
