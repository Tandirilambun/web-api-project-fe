"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch, authFetch } from "@/shared/lib/http";
import { useAuthStore } from "../store/auth.store";
import {
  type UserData,
  type LoginPayload,
  type LoginResponse,
  RegisterPayload,
} from "../type";
import path from "path";

// ---------- Login ----------

export function useLogin() {
  const setCredentials = useAuthStore((s) => s.setCredentials);

  return useMutation({
    mutationFn: (payload: LoginPayload) =>
      authFetch<LoginResponse>("api/account/login-user", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: (data) => {
      setCredentials({
        accessToken: data.data.access_token,
        tokenType: data.data.token_type,
        expiresIn: data.data.expires_in,
        user: data.data.user,
      });
    },
  });
}

// ---------- Me ----------

/**
 * `retry: false` tetap dipertahankan: 401 sudah ditangani sekali oleh
 * apiFetch (refresh + retry). Retry lagi dari React Query di atasnya
 * cuma mengulang siklus refresh untuk kegagalan yang sebenarnya permanen.
 */
export function useMe(options?: { enabled?: boolean }) {
  const setUser = useAuthStore((s) => s.setUser);

  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      const user = await apiFetch<UserData>("/auth/me");
      setUser(user);
      return user;
    },
    enabled: options?.enabled ?? true,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}

// ---------- Logout ----------

export function useLogout() {
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      apiFetch<void>("/api/account/logout-user", { method: "POST" }),
    // State lokal di-clear di onSettled (selalu jalan), bukan hanya
    // onSuccess — user yang klik logout harus "keluar" walau network
    // gagal. Risiko: kalau request gagal, cookie di backend mungkin
    // masih valid meski user sudah keluar di layar.
    onSettled: () => {
      clearAuth();
      queryClient.clear();
      window.location.href = "/login";
    },
  });
}

// ---------- Register ----------

export function useRegister() {
  return useMutation({
    mutationFn: (payload: RegisterPayload) =>
      authFetch<RegisterPayload>("api/account/register-user", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
  });
}
