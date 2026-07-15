"use client";

import React, { useState } from "react";

const WHATSAPP_NUMBER = "923215079537";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success">("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const text = encodeURIComponent(`Please subscribe me to the newsletter: ${email}`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank", "noopener,noreferrer");

    setStatus("success");
    setEmail("");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          required
          aria-label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/40"
        />
        <button
          type="submit"
          className="whitespace-nowrap rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Subscribe
        </button>
      </div>
      {status === "success" && (
        <p role="status" aria-live="polite" className="mt-2 text-xs text-emerald-400">
          Opening WhatsApp to confirm your subscription...
        </p>
      )}
    </form>
  );
}
