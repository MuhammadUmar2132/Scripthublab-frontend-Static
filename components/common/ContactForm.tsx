"use client";

import React, { useState } from "react";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import Select from "../ui/Select";
import Button from "../ui/Button";
import { sendContactMessage } from "@/lib/api";
import { SERVICE_OPTIONS } from "@/data/home";

const initialForm = { name: "", email: "", phone: "", service: "", message: "" };

export default function ContactForm({
  title = "Let's Talk",
  subtitle = "We're here to help you.",
  className = "",
}: {
  title?: string;
  subtitle?: string;
  className?: string;
}) {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  function update<K extends keyof typeof initialForm>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      await sendContactMessage(form);
      setStatus("success");
      setMessage("Thanks! We'll get back to you shortly.");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <div className={`rounded-2xl border border-slate-100 dark:border-slate-800 bg-white p-6 shadow-xl shadow-slate-200/60 dark:bg-slate-900 dark:shadow-none ${className}`}>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>

      <form onSubmit={handleSubmit} className="mt-5 space-y-3">
        <label htmlFor="contact-name" className="sr-only">
          Your Name
        </label>
        <Input
          id="contact-name"
          required
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
        />
        <label htmlFor="contact-email" className="sr-only">
          Your Email
        </label>
        <Input
          id="contact-email"
          required
          type="email"
          placeholder="Your Email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
        />
        <label htmlFor="contact-phone" className="sr-only">
          Phone Number
        </label>
        <Input
          id="contact-phone"
          type="tel"
          placeholder="Phone Number"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
        />
        <label htmlFor="contact-service" className="sr-only">
          Select Service
        </label>
        <Select id="contact-service" value={form.service} onChange={(e) => update("service", e.target.value)}>
          <option value="">Select Service</option>
          {SERVICE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
        <label htmlFor="contact-message" className="sr-only">
          Your Message
        </label>
        <Textarea
          id="contact-message"
          required
          rows={4}
          placeholder="Your Message"
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
        />

        <Button type="submit" withArrow className="w-full" disabled={status === "loading"}>
          {status === "loading" ? "Sending..." : "Send Message"}
        </Button>

        {message && (
          <p
            role="status"
            aria-live="polite"
            className={`text-xs ${
              status === "error" ? "text-red-500 dark:text-red-400" : "text-emerald-600 dark:text-emerald-400"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
