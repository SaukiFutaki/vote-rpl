// auth.config.ts
export const publicRoutes = ["/"]; // Daftar rute publik

export const authRoutes = [        // Daftar rute yang memerlukan autentikasi
  "/auth/login", 
  "/auth/register"
];

export const apiAuthPrefix = "/api/auth"; // Prefix untuk autentikasi API

export const DEFAULT_LOGIN_REDIRECT = "/dashboard"; // Rute default setelah login
