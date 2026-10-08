"use client";

import { useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthBootstrap } from "../features/authentication/components/AuthBootstrap";
// import { Navbar } from "@/shared/components/navbar";

export function Providers({ children }: { children: ReactNode }) {
  // Pola resmi TanStack Query untuk Next.js: buat instance lewat useState
  // supaya tidak ada state yang ke-share antar request saat SSR/streaming.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { retry: 1, refetchOnWindowFocus: false },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {/* <AuthBootstrap>
        <Navbar />
        {children}
      </AuthBootstrap> */}
      {children}
    </QueryClientProvider>
  );
}
