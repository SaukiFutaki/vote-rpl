import authConfig from "./auth.config";
import {
  DEFAULT_LOGIN_REDIRECT, 
  apiAuthPrefix,          
  authRoutes,             
  publicRoutes,           
} from "./routes";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Langsung lanjutkan jika route adalah API auth
  if (isApiAuthRoute) return undefined;

  // Pengalihan untuk rute yang membutuhkan autentikasi
  if (isAuthRoute && isLoggedIn) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }

  // Pengalihan jika belum login dan bukan rute publik
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  return undefined;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
