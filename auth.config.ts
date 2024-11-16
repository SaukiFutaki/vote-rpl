import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { LoginSchema } from "./schemas/authSchema";
import { getUserByNim } from "./lib/db/user";

import bcrypt from "bcryptjs";

export default {
  providers: [
    Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
        async authorize(credentials) {
          const validateFields = LoginSchema.safeParse(credentials);
  
          if (validateFields.success) {
            const { nim, password } = validateFields.data;
  
            // TODO : Check if the user exists in the database
            const user = await getUserByNim(nim);
            if (!user || !user.password) return null;
  
            // TODO : Check if the password is valid
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) return user;
          }
          return null;
        },
      }),

  ],
} satisfies NextAuthConfig;
