"use client";

import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Modal from "@/components/admin/Modal";
import {
  fetchAdminBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  uploadImage,
  fetchAdminProjects,
} from "@/lib/api";
import type { Blog, Project } from "@/lib/types";

const emptyForm = {
  title: "",
  category: "",
  excerpt: "",
  content: "",
  image: "",
  author: "ScriptHubLab Team",
  published: true,
  project: "",
};

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Blog | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  function load() {
    fetchAdminBlogs()
      .then(setBlogs)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load blogs."))
      .finally(() => setLoading(false));
    fetchAdminProjects()
      .then(setProjects)
      .catch(() => {});
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

  function openEdit(blog: Blog) {
    setEditing(blog);
    setForm({
      title: blog.title,
      category: blog.category,
      excerpt: blog.excerpt,
      content: blog.content,
      image: blog.image || "",
      author: blog.author,
      published: blog.published,
      project: blog.project || "",
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
      excerpt: form.excerpt,
      content: form.content,
      image: form.image,
      author: form.author,
      published: form.published,
      project: form.project || undefined,
    };

    try {
      if (editing) {
        await updateBlog(editing._id, payload);
      } else {
        await createBlog(payload);
      }
      setModalOpen(false);
      reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save blog post.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this blog post?")) return;
    try {
      await deleteBlog(id);
      reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete blog post.");
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Blogs</h1>
          <p className="mt-1 text-sm text-slate-500">Manage the articles shown on your blog.</p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="size-4" /> Add Blog Post
        </Button>
      </div>

      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
      {loading && <p className="mt-4 text-sm text-slate-400">Loading...</p>}

      <div className="mt-6 space-y-3">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="flex flex-wrap items-start justify-between gap-4 rounded-2xl border border-slate-100 bg-white p-5"
          >
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900">{blog.title}</h3>
                {!blog.published && (
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                    Draft
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs text-slate-500">{blog.category}</p>
              <p className="mt-2 text-xs leading-relaxed text-slate-500 line-clamp-2">
                {blog.excerpt}
              </p>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => openEdit(blog)}
                className="flex size-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50"
              >
                <Pencil className="size-4" />
              </button>
              <button
                onClick={() => handleDelete(blog._id)}
                className="flex size-8 items-center justify-center rounded-lg text-red-400 hover:bg-red-50"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <Modal title={editing ? "Edit Blog Post" : "Add Blog Post"} onClose={() => setModalOpen(false)}>
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              required
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            />
            <Input
              required
              placeholder="Category (e.g. Web Development)"
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            />
            <Textarea
              required
              rows={2}
              placeholder="Short excerpt"
              value={form.excerpt}
              onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
            />
            <Textarea
              required
              rows={6}
              placeholder="Full article content"
              value={form.content}
              onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
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
              placeholder="Author"
              value={form.author}
              onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
            />
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">
                Related project (optional)
              </label>
              <select
                value={form.project}
                onChange={(e) => setForm((f) => ({ ...f, project: e.target.value }))}
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="">None</option>
                {projects.map((project) => (
                  <option key={project._id} value={project._id}>
                    {project.title}
                  </option>
                ))}
              </select>
            </div>
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
              />
              Published
            </label>

            <Button type="submit" className="w-full" disabled={saving || uploading}>
              {saving ? "Saving..." : editing ? "Update Post" : "Create Post"}
            </Button>
          </form>
        </Modal>
      )}
    </div>
  );
}
