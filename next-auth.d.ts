import { DefaultSession } from "next-auth";
import "next-auth/jwt";
export type ExtendedUser = DefaultSession["user"] & {
  role : "ADMIN" | "USER";
 
 

}

declare module "next-auth" {
 interface Session {
    user : ExtendedUser;
 }
}

declare module "next-auth/jwt" { 
    interface JWT {
      role : "ADMIN" | "USER"; 
    }
}