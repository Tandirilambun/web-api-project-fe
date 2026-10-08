"use client";

import { useAuthStore, selectUser } from "@/features/authentication/store/auth.store";
import { useLogout } from "@/features/authentication/api/auth.api";

export function Navbar() {
  const user = useAuthStore(selectUser);
  const logout = useLogout();

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 24px",
        borderBottom: "1px solid #e5e5e5",
      }}
    >
      <span style={{ fontWeight: 600 }}>{user?.name}</span>

      {user ? (
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span>{user.name}</span>
          <button onClick={() => logout.mutate()} disabled={logout.isPending}>
            {logout.isPending ? "Logging out..." : "Logout"}
          </button>
        </div>
      ) : (
        <span>Guest</span>
      )}
    </nav>
  );
}
