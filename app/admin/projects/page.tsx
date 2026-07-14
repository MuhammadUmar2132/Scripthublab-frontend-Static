"use client";

import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Modal from "@/components/admin/Modal";
import {
  fetchAdminProjects,
  createProject,
  updateProject,
  deleteProject,
  uploadImage,
} from "@/lib/api";
import type { Project } from "@/lib/types";

const emptyForm = {
  title: "",
  category: "",
  description: "",
  image: "",
  tags: "",
  liveUrl: "",
  featured: false,
  client: "",
  duration: "",
  role: "",
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  function load() {
    fetchAdminProjects()
      .then(setProjects)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load projects."))
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

  function openEdit(project: Project) {
    setEditing(project);
    setForm({
      title: project.title,
      category: project.category,
      description: project.description,
      image: project.image || "",
      tags: project.tags?.join(", ") || "",
      liveUrl: project.liveUrl || "",
      featured: project.featured,
      client: project.client || "",
      duration: project.duration || "",
      role: project.role || "",
    });
    setModalOpen(true);
  }

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");
    try {
      const url = await uploadImage(file);
      setForm((f) => ({ ...f, image: url }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload image.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.image) {
      setError("Please upload a main image.");
      return;
    }

    setSaving(true);
    setError("");

    const payload = {
      title: form.title,
      category: form.category,
      description: form.description,
      image: form.image,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      liveUrl: form.liveUrl || undefined,
      featured: form.featured,
      client: form.client || undefined,
      duration: form.duration || undefined,
      role: form.role || undefined,
    };

    try {
      if (editing) {
        await updateProject(editing._id, payload);
      } else {
        await createProject(payload);
      }
      setModalOpen(false);
      reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save project.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this project?")) return;
    try {
      await deleteProject(id);
      reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete project.");
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Projects</h1>
          <p className="mt-1 text-sm text-slate-500">Manage the projects shown on your website.</p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="size-4" /> Add Project
        </Button>
      </div>

      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
      {loading && <p className="mt-4 text-sm text-slate-400">Loading...</p>}

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div key={project._id} className="rounded-2xl border border-slate-100 bg-white p-5">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900">{project.title}</h3>
                <p className="mt-0.5 text-xs text-slate-500">{project.category}</p>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => openEdit(project)}
                  className="flex size-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50"
                >
                  <Pencil className="size-4" />
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="flex size-8 items-center justify-center rounded-lg text-red-400 hover:bg-red-50"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-500 line-clamp-3">
              {project.description}
            </p>
          </div>
        ))}
      </div>

      {modalOpen && (
        <Modal title={editing ? "Edit Project" : "Add Project"} onClose={() => setModalOpen(false)}>
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              required
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            />
            <Input
              required
              placeholder="Category (e.g. Web Application)"
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            />
            <Textarea
              required
              rows={3}
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            />
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">
                Main image {!editing && <span className="text-red-500">*</span>}
              </label>
              <Input type="file" accept="image/*" onChange={handleImageChange} />
              {uploading && <p className="mt-1 text-xs text-slate-400">Uploading...</p>}
              {form.image && !uploading && (
                <img
                  src={form.image}
                  alt="Preview"
                  className="mt-2 h-24 w-24 rounded-lg object-cover"
                />
              )}
            </div>
            <Input
              placeholder="Tags / Tech Stack, comma separated (e.g. MongoDB, Express, React)"
              value={form.tags}
              onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
            />
            <Input
              placeholder="Live URL (optional)"
              value={form.liveUrl}
              onChange={(e) => setForm((f) => ({ ...f, liveUrl: e.target.value }))}
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                placeholder="Client (optional)"
                value={form.client}
                onChange={(e) => setForm((f) => ({ ...f, client: e.target.value }))}
              />
              <Input
                placeholder="Duration (optional)"
                value={form.duration}
                onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))}
              />
            </div>
            <Input
              placeholder="Role (optional, e.g. Full Stack Developer)"
              value={form.role}
              onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
            />
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
              />
              Featured project
            </label>

            <Button type="submit" className="w-full" disabled={saving || uploading}>
              {saving ? "Saving..." : editing ? "Update Project" : "Create Project"}
            </Button>
          </form>
        </Modal>
      )}
    </div>
  );
}
