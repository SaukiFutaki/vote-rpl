

import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import prisma from "./lib/db/prisma";
import { getUserById } from "./lib/db/user";
import { USerRole } from "@prisma/client";



export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    // async signIn({user}) {
    //   const existingUser = await getUserById(user.id as string);

    //   if (!existingUser ) {
    //     return false;
    //   }

    //   return true;
    // },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as USerRole
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      token.role = existingUser.role as USerRole;

      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  ...authConfig,
  session: {
    strategy: "jwt",
  },
});
