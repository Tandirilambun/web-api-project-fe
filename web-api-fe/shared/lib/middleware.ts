import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// GANTI sesuai nama cookie yang BENAR-BENAR di-set backend kamu lewat
// Set-Cookie saat login/refresh. Kalau nama ini salah, middleware ini
// akan selalu redirect ke /login walau user sebenarnya sudah login.
const REFRESH_COOKIE_NAME = "refresh_token";

const PROTECTED_PREFIXES = ["/dashboard", "/admin"];

/**
 * PENTING — batasan middleware ini:
 * Hanya mengecek APAKAH cookie-nya ada, BUKAN apakah isinya masih valid
 * atau sudah expired (itu perlu verifikasi signature dan lebih baik
 * dilakukan backend, bukan didobel di edge). Tujuannya cuma mencegah
 * flash konten protected untuk user yang jelas-jelas belum pernah login.
 *
 * Otorisasi sesungguhnya (termasuk role) tetap di RequireAuth (client)
 * dan di backend (yang harus selalu re-validasi token di setiap request,
 * terlepas dari apa yang middleware ini putuskan).
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));

  if (!isProtected) return NextResponse.next();

  const hasRefreshCookie = request.cookies.has(REFRESH_COOKIE_NAME);

  if (!hasRefreshCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};