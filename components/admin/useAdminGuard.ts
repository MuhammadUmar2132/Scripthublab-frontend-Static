"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getToken, clearToken } from "@/lib/api";

export function useAdminGuard(skip = false) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (skip) return;

    const token = getToken();
    if (!token) {
      router.replace("/admin/login");
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- token check requires a browser-only API (localStorage), so it can't happen during render
    setReady(true);
  }, [router, pathname, skip]);

  function logout() {
    clearToken();
    router.replace("/admin/login");
  }

  return { ready, logout };
}
