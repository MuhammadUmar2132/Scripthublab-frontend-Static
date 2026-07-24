"use client";

import React, { useState } from "react";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import Button from "../ui/Button";

const WHATSAPP_NUMBER = "923215079537";
const initialForm = { name: "", email: "", phone: "", coverLetter: "" };

export default function ApplyForm({ jobTitle }: { jobTitle: string }) {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const [message, setMessage] = useState("");

  function update<K extends keyof typeof initialForm>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const lines = [
      `Job Application: ${jobTitle}`,
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.phone && `Phone: ${form.phone}`,
      form.coverLetter && `Cover Letter: ${form.coverLetter}`,
      "(Please attach your resume in the chat)",
    ].filter(Boolean);

    const text = encodeURIComponent(lines.join("\n"));

    setStatus("success");
    setMessage("Application ready! Redirecting you to WhatsApp — please attach your resume there.");
    setForm(initialForm);

    window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
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

      <p className="text-xs text-slate-400 dark:text-slate-500">
        You&apos;ll be redirected to WhatsApp to attach your resume and send your application.
      </p>

      <Button type="submit" withArrow className="w-full">
        Apply via WhatsApp
      </Button>
    </form>
  );
}
