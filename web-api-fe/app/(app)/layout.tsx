import React from "react";
import { AuthBootstrap } from "@/features/authentication/components/AuthBootstrap";
import { Navbar } from "@/shared/components/navbar";
import { RequireAuth } from "@/shared/components/requireAuth";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthBootstrap>
        <RequireAuth>
          <Navbar />
          {children}
        </RequireAuth>
      </AuthBootstrap>
    </>
  );
}
