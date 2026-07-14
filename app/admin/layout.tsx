"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useAdminGuard } from "@/components/admin/useAdminGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";
  const { ready, logout } = useAdminGuard(isLoginPage);

  if (isLoginPage) {
    return <div className="admin-scope">{children}</div>;
  }

  if (!ready) {
    return (
      <div className="admin-scope flex min-h-screen items-center justify-center bg-slate-50 text-sm text-slate-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="admin-scope flex min-h-screen bg-slate-50">
      <AdminSidebar onLogout={logout} />
      <main className="flex-1 overflow-x-hidden">
        <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>
      </main>
    </div>
  );
}
