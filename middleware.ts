// Mengimpor konfigurasi untuk autentikasi dari file 'auth.config'
import authConfig from "./auth.config";

// Mengimpor NextAuth dan beberapa konstanta yang digunakan dalam proses autentikasi
import NextAuth from "next-auth";
import {
  DEFAULT_LOGIN_REDIRECT, // URL untuk pengalihan setelah login
  apiAuthPrefix,          // Prefix untuk URL route autentikasi API
  authRoutes,             // Daftar route yang memerlukan autentikasi
  publicRoutes,           // Daftar route yang dapat diakses secara publik tanpa autentikasi
} from "./routes";

// Menginisialisasi NextAuth dengan konfigurasi yang telah disediakan
const { auth } = NextAuth(authConfig);

// Mengekspor fungsi autentikasi yang akan digunakan dalam middleware
export default auth((req) => {
  // Mendapatkan objek 'nextUrl' dari request, yang berisi informasi tentang URL yang sedang diakses
  const { nextUrl } = req;

  // Mengecek apakah user saat ini sudah login berdasarkan informasi autentikasi
  const isLoggedIn = !!req.auth;

  // Memeriksa apakah route yang diakses adalah route autentikasi API
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  // Memeriksa apakah route yang diakses adalah route publik yang tidak memerlukan autentikasi
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

  // Memeriksa apakah route yang diakses adalah route yang membutuhkan autentikasi
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Jika route yang diakses adalah route autentikasi API, lanjutkan tanpa melakukan apa-apa
  if (isApiAuthRoute) {
    return undefined;
  }

  // Jika route yang diakses adalah route autentikasi dan user sudah login,
  // arahkan user ke halaman redirect setelah login
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return undefined;
  }

  // Jika user belum login dan mencoba mengakses route yang bukan route publik,
  // arahkan user ke halaman login ('/sign-in')
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  // Jika semua kondisi di atas tidak terpenuhi, lanjutkan dengan permintaan (tidak ada pengalihan)
  return undefined;
});

// Konfigurasi untuk middleware ini yang menentukan route mana saja yang akan diproses
export const config = {
  // 'matcher' menentukan rute mana yang akan diperiksa oleh middleware ini.
  // Middleware akan memproses URL dengan pola yang sesuai, yaitu:
  // - Semua route yang tidak memiliki ekstensi file (misalnya .js, .css, .html)
  // - Semua route yang dimulai dengan '/api' atau '/trpc' (untuk API routes)
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
