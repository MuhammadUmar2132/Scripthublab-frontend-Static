"use client";

import React, { useEffect, useState } from "react";
import { fetchSubscribers } from "@/lib/api";
import type { Subscriber } from "@/lib/types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export default function AdminSubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSubscribers()
      .then(setSubscribers)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load subscribers."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Newsletter Subscribers</h1>
      <p className="mt-1 text-sm text-slate-500">Emails collected from the footer newsletter form.</p>

      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
      {loading && <p className="mt-4 text-sm text-slate-400">Loading...</p>}

      {!loading && subscribers.length === 0 && (
        <p className="mt-6 text-sm text-slate-400">No subscribers yet.</p>
      )}

      {subscribers.length > 0 && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-100 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-100 bg-slate-50 text-xs font-semibold uppercase text-slate-500">
              <tr>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Subscribed On</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((sub) => (
                <tr key={sub._id} className="border-b border-slate-50 last:border-0">
                  <td className="px-5 py-3 text-slate-700">{sub.email}</td>
                  <td className="px-5 py-3 text-slate-500">{formatDate(sub.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
