import { Mutex } from "async-mutex";
import { useAuthStore } from "@/features/authentication/store/auth.store";

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

async function parseResponse<T>(res: Response): Promise<T> {
  const isJson = res.headers.get("content-type")?.includes("application/json");
  const body = isJson ? await res.json().catch(() => null) : null;

  if (!res.ok) {
    throw new ApiError(res.status, body?.message ?? res.statusText);
  }
  return body as T;
}

/**
 * CATATAN Next.js: fetch di sini selalu dipanggil dari Client Component
 * (browser), bukan saat render di server. Next.js hanya menambahkan
 * caching/dedup otomatis ke fetch yang dipanggil SAAT RENDER di Server
 * Component — jadi kamu TIDAK perlu `cache: "no-store"` di sini. Kalau
 * suatu saat kamu pindahkan fetch auth ini ke Server Component/Route
 * Handler, baca ulang bagian ini karena perilakunya beda.
 */

/**
 * Padanan `authClient` di versi axios: tanpa auto-refresh, dipakai khusus
 * /auth/login dan /auth/refresh. Mencegah infinite loop kalau /auth/refresh
 * sendiri balas 401.
 */
export async function authFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${path}`, {
    ...init,
    credentials: "include", // wajib: kirim cookie httpOnly refresh token
    headers: { "Content-Type": "application/json", ...init.headers },
  });
  return parseResponse<T>(res);
}

export type RefreshResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

/**
 * Single-flight guard. Tanpa ini, beberapa request yang kena 401
 * bersamaan memicu beberapa panggilan /auth/refresh sekaligus — kalau
 * backend pakai refresh token rotation, ini bisa mencabut seluruh sesi.
 * Hanya berlaku per-tab (in-memory) — lihat README bagian multi-tab.
 */
const mutex = new Mutex();

export async function refreshSession(): Promise<void> {
  const data = await authFetch<RefreshResponse>("/api/account/refresh", { method: "POST" });
  useAuthStore.getState().setCredentials({
    accessToken: data.access_token,
    tokenType: data.token_type,
    expiresIn: data.expires_in,
  });
}

/**
 * Padanan `api` (axios instance + interceptor) di versi sebelumnya.
 * Karena fetch tidak punya interceptor, retry-setelah-401 ditangani
 * lewat parameter `_isRetry` yang dipanggil ulang secara rekursif —
 * padanan `config._retry` di axios, cuma bentuknya parameter karena
 * fetch tidak punya objek config yang bisa dimutasi.
 */
export async function apiFetch<T>(
  path: string,
  init: RequestInit = {},
  _isRetry = false
): Promise<T> {
  
  await mutex.waitForUnlock();

  const { accessToken, tokenType } = useAuthStore.getState();
  const res = await fetch(`${path}`, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `${tokenType ?? "Bearer"} ${accessToken}` } : {}),
      ...init.headers,
    },
  });

  if (res.status === 401 && !_isRetry) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        await refreshSession();
      } catch (err) {
        useAuthStore.getState().clearAuth();
        release();
        throw err;
      }
      release();
    } else {
      await mutex.waitForUnlock();
    }
    return apiFetch<T>(path, init, true);
  }

  return parseResponse<T>(res);
}
