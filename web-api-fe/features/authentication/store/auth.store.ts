export type AuthStatus = "idle" | "authenticated" | "unauthenticated";

type AuthState = {
  accessToken: string | null;
  tokenType: string | null;
  expiresAt: number | null;
  user: UserData | null;
  status: AuthStatus;
  setCredentials: (p: {
    accessToken: string;
    tokenType: string;
    expiresIn: number;
    user?: UserData;
  }) => void;
  setUser: (user: UserData) => void;
  clearAuth: () => void;
};

import { UserData } from "../type";
import { create } from "zustand";

/**
 * KEPUTUSAN: tidak pakai `persist` middleware.
 * Refresh token ada di httpOnly cookie, tidak bisa disentuh JS. Setiap
 * reload / navigasi awal, AuthBootstrap memanggil /auth/refresh ulang
 * lewat cookie itu. Jangan tambahkan persist di sini nanti tanpa sadar —
 * itu regresi keamanan.
 *
 * File ini TIDAK butuh "use client" — dia tidak memanggil hook React,
 * cuma `create()` dari zustand yang menghasilkan hook. Boundary "use
 * client" cukup ditaruh di komponen yang benar-benar memanggil
 * `useAuthStore(selector)`.
 */
export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  tokenType: null,
  expiresAt: null,
  user: null,
  status: "idle",

  setCredentials: ({ accessToken, tokenType, expiresIn, user }) =>
    set((state) => ({
      accessToken,
      tokenType,
      expiresAt: Date.now() + expiresIn * 1000,
      user: user ?? state.user,
      status: "authenticated",
    })),

  setUser: (user) => set({ user }),

  clearAuth: () =>
    set({
      accessToken: null,
      tokenType: null,
      expiresAt: null,
      user: null,
      status: "unauthenticated",
    }),
}));

export const selectUser = (s: AuthState) => s.user;
export const selectAuthStatus = (s: AuthState) => s.status;
export const selectAccessToken = (s: AuthState) => s.accessToken;
