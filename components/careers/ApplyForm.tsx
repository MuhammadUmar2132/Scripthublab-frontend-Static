"use client";

import React, { useState } from "react";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import Button from "../ui/Button";
import { applyToJob, uploadResume } from "@/lib/api";

const initialForm = { name: "", email: "", phone: "", coverLetter: "" };

export default function ApplyForm({ jobId }: { jobId: string }) {
  const [form, setForm] = useState(initialForm);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  function update<K extends keyof typeof initialForm>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!resumeFile) {
      setStatus("error");
      setMessage("Please attach your resume.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const resumeUrl = await uploadResume(resumeFile);
      const res = await applyToJob({ jobId, ...form, resumeUrl });
      setStatus("success");
      setMessage(res.message || "Your application has been submitted.");
      setForm(initialForm);
      setResumeFile(null);
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6 text-sm font-medium text-emerald-700 dark:border-emerald-900 dark:bg-emerald-500/10 dark:text-emerald-400">
        {message}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <label htmlFor="apply-name" className="sr-only">
        Your Name
      </label>
      <Input
        id="apply-name"
        required
        placeholder="Your Name"
        value={form.name}
        onChange={(e) => update("name", e.target.value)}
      />
      <label htmlFor="apply-email" className="sr-only">
        Your Email
      </label>
      <Input
        id="apply-email"
        required
        type="email"
        placeholder="Your Email"
        value={form.email}
        onChange={(e) => update("email", e.target.value)}
      />
      <label htmlFor="apply-phone" className="sr-only">
        Phone Number
      </label>
      <Input
        id="apply-phone"
        placeholder="Phone Number"
        value={form.phone}
        onChange={(e) => update("phone", e.target.value)}
      />
      <div>
        <label htmlFor="apply-resume" className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
          Resume (PDF or Word) <span className="text-red-500">*</span>
        </label>
        <Input
          id="apply-resume"
          required
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
        />
      </div>
      <label htmlFor="apply-cover-letter" className="sr-only">
        Cover letter
      </label>
      <Textarea
        id="apply-cover-letter"
        rows={4}
        placeholder="Cover letter (optional)"
        value={form.coverLetter}
        onChange={(e) => update("coverLetter", e.target.value)}
      />

      {status === "error" && (
        <p role="alert" aria-live="assertive" className="text-sm text-red-500">
          {message}
        </p>
      )}

      <Button type="submit" withArrow className="w-full" disabled={status === "loading"}>
        {status === "loading" ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  );
}
