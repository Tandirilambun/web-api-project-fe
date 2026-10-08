"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore, selectUser } from "@/features/authentication/store/auth.store";

/**
 * Dipakai membungkus konten sebuah page, BUKAN sebagai route element
 * seperti react-router. Contoh: app/dashboard/page.tsx.
 *
 * Ini murni client-side check. Kalau kamu sudah pasang middleware.ts
 * (lihat file itu), middleware menangani kasus "jelas belum login" di
 * edge sebelum page ini sempat di-render sama sekali. RequireAuth di sini
 * tetap perlu ada untuk: (a) role-based check yang tidak dilakukan
 * middleware, dan (b) navigasi client-side (Link/router.push) yang tidak
 * lewat middleware lagi selama masih dalam sesi SPA yang sama.
 */
export function RequireAuth({
  children,
  roles,
}: {
  children: ReactNode;
  roles?: string[];
}) {
  const user = useAuthStore(selectUser);
  const router = useRouter();
  const pathname = usePathname();

  const isAuthorized = !!user && (!roles || roles.some((r) => user.roles.includes(r)));

  useEffect(() => {
    if (!user) {
      router.replace(`/login?from=${encodeURIComponent(pathname)}`);
    } else if (roles && !roles.some((r) => user.roles.includes(r))) {
      router.replace("/403");
    }
  }, [user, roles, router, pathname]);

  // Render null selama redirect diproses, bukan konten protected-nya.
  // Trade-off: flash "kosong" sesaat, bukan flash konten yang salah.
  if (!isAuthorized) return null;

  return <>{children}</>;
}