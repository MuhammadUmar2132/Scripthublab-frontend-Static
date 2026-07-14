"use client";

import React, { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import { fetchApplications, updateApplicationStatus } from "@/lib/api";
import type { JobApplication } from "@/lib/types";

const STATUSES: JobApplication["status"][] = ["new", "reviewed", "shortlisted", "rejected"];

const STATUS_STYLES: Record<JobApplication["status"], string> = {
  new: "bg-blue-50 text-blue-600",
  reviewed: "bg-slate-100 text-slate-600",
  shortlisted: "bg-emerald-50 text-emerald-600",
  rejected: "bg-red-50 text-red-600",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function load() {
    fetchApplications()
      .then(setApplications)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load applications."))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleStatusChange(id: string, status: JobApplication["status"]) {
    setApplications((apps) => apps.map((a) => (a._id === id ? { ...a, status } : a)));
    try {
      await updateApplicationStatus(id, status);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update status.");
      load();
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Job Applications</h1>
      <p className="mt-1 text-sm text-slate-500">Applications submitted through the careers page.</p>

      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
      {loading && <p className="mt-4 text-sm text-slate-400">Loading...</p>}

      {!loading && applications.length === 0 && (
        <p className="mt-6 text-sm text-slate-400">No applications yet.</p>
      )}

      <div className="mt-6 space-y-3">
        {applications.map((app) => (
          <div key={app._id} className="rounded-2xl border border-slate-100 bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900">{app.name}</h3>
                <p className="mt-0.5 text-xs font-medium text-blue-600">
                  {typeof app.job === "object" ? app.job.title : "Job"}
                </p>
              </div>
              <span className="text-xs text-slate-400">{formatDate(app.createdAt)}</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">
              <span>{app.email}</span>
              {app.phone && <span>{app.phone}</span>}
            </div>
            {app.coverLetter && (
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{app.coverLetter}</p>
            )}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <a
                href={app.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                <FileText className="size-3.5" /> View Resume
              </a>
              <select
                value={app.status}
                onChange={(e) => handleStatusChange(app._id, e.target.value as JobApplication["status"])}
                className={`rounded-full border-none px-2.5 py-1 text-[11px] font-semibold outline-none ${STATUS_STYLES[app.status]}`}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
