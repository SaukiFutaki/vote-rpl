import authConfig from "./auth.config";

import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
  const isPublicRoute = "/".includes(nextUrl.pathname)
  const isAuthRoute = "/auth/login".includes(nextUrl.pathname) || "/auth/register".includes(nextUrl.pathname);

  // Langsung lanjutkan jika route adalah API auth
  if (isApiAuthRoute) return undefined;

  // Pengalihan untuk rute yang membutuhkan autentikasi
  if (isAuthRoute && isLoggedIn) {
    return Response.redirect(new URL("/dashboard", nextUrl));
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
