"use client";

import React, { useEffect, useState } from "react";
import { Mail, Users, FolderKanban, Newspaper, FileText, Briefcase, UserCheck } from "lucide-react";
import { fetchStats } from "@/lib/api";
import type { Stats } from "@/lib/types";

const CARDS = [
  { key: "messages" as const, label: "Contact Messages", icon: Mail, color: "text-blue-600 bg-blue-50" },
  { key: "subscribers" as const, label: "Newsletter Subscribers", icon: Users, color: "text-emerald-600 bg-emerald-50" },
  { key: "projects" as const, label: "Projects", icon: FolderKanban, color: "text-amber-600 bg-amber-50" },
  { key: "blogs" as const, label: "Blog Posts", icon: Newspaper, color: "text-purple-600 bg-purple-50" },
  { key: "articles" as const, label: "Articles", icon: FileText, color: "text-rose-600 bg-rose-50" },
  { key: "jobs" as const, label: "Open Jobs", icon: Briefcase, color: "text-sky-600 bg-sky-50" },
  { key: "applications" as const, label: "Job Applications", icon: UserCheck, color: "text-teal-600 bg-teal-50" },
];

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStats()
      .then(setStats)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load stats."));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
      <p className="mt-1 text-sm text-slate-500">Overview of your website activity.</p>

      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CARDS.map((card) => (
          <div key={card.key} className="rounded-2xl border border-slate-100 bg-white p-5">
            <div className={`flex size-10 items-center justify-center rounded-xl ${card.color}`}>
              <card.icon className="size-5" />
            </div>
            <p className="mt-4 text-2xl font-bold text-slate-900">
              {stats ? stats[card.key] : "—"}
            </p>
            <p className="mt-1 text-xs font-medium text-slate-500">{card.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
