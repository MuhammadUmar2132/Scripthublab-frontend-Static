"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/common/Logo";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { adminLogin, getToken } from "@/lib/api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (getToken()) router.replace("/admin/dashboard");
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await adminLogin(username, password);
      router.push("/admin/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-slate-50 px-4 py-16">
      <div className="w-full max-w-sm rounded-2xl border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/60">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h1 className="mt-6 text-center text-xl font-bold text-slate-900">Admin Login</h1>
        <p className="mt-1 text-center text-sm text-slate-500">
          Sign in to manage your website.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          <label htmlFor="admin-username" className="sr-only">
            Username
          </label>
          <Input
            id="admin-username"
            required
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
          <label htmlFor="admin-password" className="sr-only">
            Password
          </label>
          <Input
            id="admin-password"
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p role="alert" aria-live="assertive" className="text-xs text-red-500">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}
