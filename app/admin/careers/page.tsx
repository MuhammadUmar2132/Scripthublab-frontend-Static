"use client";

import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Modal from "@/components/admin/Modal";
import { fetchAdminJobs, createJob, updateJob, deleteJob } from "@/lib/api";
import type { Job } from "@/lib/types";

const JOB_TYPES: Job["type"][] = ["Full-time", "Part-time", "Contract", "Internship", "Remote"];

const emptyForm = {
  title: "",
  department: "",
  location: "",
  type: "Full-time" as Job["type"],
  description: "",
  requirements: "",
  salaryRange: "",
  expiresAt: "",
  active: true,
};

function toDateInputValue(iso: string) {
  return iso ? iso.slice(0, 10) : "";
}

function isExpired(job: Job) {
  return new Date(job.expiresAt) < new Date();
}

export default function AdminCareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Job | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  function load() {
    fetchAdminJobs()
      .then(setJobs)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load jobs."))
      .finally(() => setLoading(false));
  }

  function reload() {
    setLoading(true);
    load();
  }

  useEffect(load, []);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEdit(job: Job) {
    setEditing(job);
    setForm({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      description: job.description,
      requirements: job.requirements?.join("\n") || "",
      salaryRange: job.salaryRange || "",
      expiresAt: toDateInputValue(job.expiresAt),
      active: job.active,
    });
    setModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setSaving(true);
    setError("");

    const payload = {
      title: form.title,
      department: form.department,
      location: form.location,
      type: form.type,
      description: form.description,
      requirements: form.requirements
        .split("\n")
        .map((r) => r.trim())
        .filter(Boolean),
      salaryRange: form.salaryRange || undefined,
      expiresAt: form.expiresAt,
      active: form.active,
    };

    try {
      if (editing) {
        await updateJob(editing._id, payload);
      } else {
        await createJob(payload);
      }
      setModalOpen(false);
      reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save job.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this job posting?")) return;
    try {
      await deleteJob(id);
      reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete job.");
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Careers</h1>
          <p className="mt-1 text-sm text-slate-500">Manage job postings shown on the careers page.</p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="size-4" /> Add Job
        </Button>
      </div>

      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
      {loading && <p className="mt-4 text-sm text-slate-400">Loading...</p>}

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => {
          const expired = isExpired(job);
          return (
            <div key={job._id} className="rounded-2xl border border-slate-100 bg-white p-5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{job.title}</h3>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {job.department} &middot; {job.location}
                  </p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => openEdit(job)}
                    className="flex size-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50"
                  >
                    <Pencil className="size-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="flex size-8 items-center justify-center rounded-lg text-red-400 hover:bg-red-50"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-semibold">
                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-blue-600">{job.type}</span>
                {!job.active ? (
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-500">Inactive</span>
                ) : expired ? (
                  <span className="rounded-full bg-red-50 px-2.5 py-1 text-red-600">Expired</span>
                ) : (
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-600">Open</span>
                )}
              </div>
              <p className="mt-3 text-xs leading-relaxed text-slate-500 line-clamp-3">{job.description}</p>
              <p className="mt-3 text-[11px] font-medium text-slate-400">
                Expires {new Date(job.expiresAt).toLocaleDateString()}
              </p>
            </div>
          );
        })}
      </div>

      {modalOpen && (
        <Modal title={editing ? "Edit Job" : "Add Job"} onClose={() => setModalOpen(false)}>
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              required
              placeholder="Job Title"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                required
                placeholder="Department"
                value={form.department}
                onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))}
              />
              <Input
                required
                placeholder="Location"
                value={form.location}
                onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Select
                value={form.type}
                onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as Job["type"] }))}
              >
                {JOB_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </Select>
              <Input
                type="date"
                required
                value={form.expiresAt}
                onChange={(e) => setForm((f) => ({ ...f, expiresAt: e.target.value }))}
              />
            </div>
            <Textarea
              required
              rows={3}
              placeholder="Job description"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            />
            <Textarea
              rows={3}
              placeholder="Requirements, one per line"
              value={form.requirements}
              onChange={(e) => setForm((f) => ({ ...f, requirements: e.target.value }))}
            />
            <Input
              placeholder="Salary range (optional, e.g. $60k - $80k)"
              value={form.salaryRange}
              onChange={(e) => setForm((f) => ({ ...f, salaryRange: e.target.value }))}
            />
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))}
              />
              Active (visible on careers page)
            </label>

            <Button type="submit" className="w-full" disabled={saving}>
              {saving ? "Saving..." : editing ? "Update Job" : "Create Job"}
            </Button>
          </form>
        </Modal>
      )}
    </div>
  );
}
