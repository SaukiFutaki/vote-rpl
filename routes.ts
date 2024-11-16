// Mengimpor konfigurasi autentikasi yang telah dibuat sebelumnya
// import { auth } from '@/auth';

/**
 *  Daftar rute publik yang dapat diakses tanpa autentikasi.
 *  Pengguna yang tidak login dapat mengakses rute-rute ini tanpa batasan.
 *  
 *  @type {string[]}
 */
export const publicRoutes = [
    "/",
    "/new-verification",  // Rute untuk verifikasi baru
    "/demo",              // Rute untuk demo atau tampilan contoh
  ];
  
  /**
   *  Daftar rute yang memerlukan autentikasi.
   *  Pengguna yang tidak login akan diarahkan ke halaman login jika mencoba mengakses rute-rute ini.
   *  
   *  @type {string[]}
   */
  export const authRoutes = [
    "/auth/login",            // Halaman login
    "/auth/register",            // Halaman pendaftaran
    "/error",              // Halaman error yang hanya dapat diakses oleh pengguna yang sudah login
    "/forgot-password",    // Halaman untuk melupakan password
    "/new-password",       // Halaman untuk mengatur ulang password setelah permintaan
  ];
  
  /**
   *  Prefix untuk rute autentikasi API.
   *  Rute ini digunakan untuk endpoint-endpoint yang terkait dengan autentikasi, seperti login API atau pendaftaran API.
   *  
   *  @type {string}
   */
  export const apiAuthPrefix = "/api/auth";
  
  /**
   *  Rute default yang akan diakses setelah login berhasil.
   *  Setelah berhasil login, pengguna akan diarahkan ke halaman ini, misalnya halaman dashboard.
   *  
   *  @type {string}
   */
  export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
  