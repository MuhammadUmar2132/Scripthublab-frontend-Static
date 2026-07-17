"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import ContactForm from "./ContactForm";

export default function LeadPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (hasShown) return;

      const heroSection = document.querySelector("section");
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;

        // Trigger when hero section is scrolled out of view
        if (heroBottom < 0) {
          setIsOpen(true);
          setHasShown(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasShown]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="relative w-full max-w-md animate-in zoom-in-95 duration-300">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute -right-3 -top-3 flex size-8 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg transition-transform hover:scale-110 dark:bg-white dark:text-slate-900"
          aria-label="Close popup"
        >
          <X className="size-4" />
        </button>
        <ContactForm
          title="Get Your Free Quote"
          subtitle="Fill out the form and we'll get back to you within 24 hours."
        />
      </div>
    </div>
  );
}
