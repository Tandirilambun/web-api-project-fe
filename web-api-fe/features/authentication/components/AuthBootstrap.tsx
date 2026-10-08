"use client";

import { useEffect, useState, type ReactNode } from "react";
import { refreshSession } from "@/shared/lib/http";
import { useAuthStore, selectAuthStatus } from "../store/auth.store";
import { useMe } from "../api/auth.api";

/**
 * Menahan render children sampai store punya status final — TAPI hanya
 * kalau memang perlu. Kalau store sudah "authenticated" (misal baru saja
 * login lewat useLogin, yang sudah mengisi accessToken+user di Zustand),
 * tidak ada alasan panggil /auth/refresh lagi — itu sesi yang sama yang
 * baru beberapa detik lalu didapat, bukan store kosong yang butuh
 * dipulihkan dari cookie.
 *
 * refreshSession() HANYA dipanggil kalau status === "idle", yaitu kondisi
 * store benar-benar belum tahu apa-apa — terjadi saat (app) layout mount
 * pertama kali dalam satu life JS browser: hard reload, buka tab baru,
 * ketik URL langsung. Navigasi client-side SETELAH login tidak akan
 * memicu refresh ulang karena status sudah "authenticated" sebelum
 * AuthBootstrap sempat mount.
 */
export function AuthBootstrap({ children }: { children: ReactNode }) {
  const status = useAuthStore(selectAuthStatus);
  const hasUser = useAuthStore((s) => !!s.user);

  // `refreshAttempted` HANYA diisi di dalam callback setelah refreshSession()
  // benar-benar selesai (settle) — itu respons terhadap operasi eksternal
  // nyata (panggilan API), bukan sekadar menyalin state lain. Ini beda
  // dengan versi sebelumnya yang memanggil setState langsung di body efek
  // tanpa operasi asinkron, yang ditegur React sebagai anti-pattern.
  const [refreshAttempted, setRefreshAttempted] = useState(false);

  useEffect(() => {
    // Kalau status sudah final (bukan idle), tidak ada apa pun yang perlu
    // dilakukan efek ini — TIDAK ada setState di sini sama sekali.
    if (status !== "idle") return;

    let cancelled = false;

    (async () => {
      try {
        await refreshSession();
      } catch {
        if (!cancelled) useAuthStore.getState().clearAuth();
      } finally {
        if (!cancelled) setRefreshAttempted(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [status]);

  // Derivasi murni saat render, bukan state yang disinkronkan manual.
  const refreshDone = status !== "idle" || refreshAttempted;

  // Sama logikanya: kalau `user` sudah ada (dari response login), tidak
  // perlu fetch /auth/me lagi — data yang sama baru saja didapat.
  const needsUserFetch = refreshDone && status === "authenticated" && !hasUser;
  const meQuery = useMe({ enabled: needsUserFetch });

  const stillLoading = !refreshDone || (needsUserFetch && meQuery.isPending);

  if (stillLoading) return <FullPageSpinner />;
  return <>{children}</>;
}

function FullPageSpinner() {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      Loading...
    </div>
  );
}
