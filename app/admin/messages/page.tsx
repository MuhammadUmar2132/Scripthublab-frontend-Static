"use client";

import React, { useEffect, useState } from "react";
import { fetchMessages } from "@/lib/api";
import type { ContactMessage } from "@/lib/types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMessages()
      .then(setMessages)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load messages."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Contact Messages</h1>
      <p className="mt-1 text-sm text-slate-500">Messages submitted through the website forms.</p>

      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
      {loading && <p className="mt-4 text-sm text-slate-400">Loading...</p>}

      {!loading && messages.length === 0 && (
        <p className="mt-6 text-sm text-slate-400">No messages yet.</p>
      )}

      <div className="mt-6 space-y-3">
        {messages.map((msg) => (
          <div key={msg._id} className="rounded-2xl border border-slate-100 bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-slate-900">{msg.name}</h3>
              <span className="text-xs text-slate-400">{formatDate(msg.createdAt)}</span>
            </div>
            <div className="mt-1 flex flex-wrap gap-3 text-xs text-slate-500">
              <span>{msg.email}</span>
              {msg.phone && <span>{msg.phone}</span>}
              {msg.service && (
                <span className="rounded-full bg-blue-50 px-2 py-0.5 text-blue-600">
                  {msg.service}
                </span>
              )}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{msg.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
