"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import Button from "../ui/Button";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Articles", href: "/articles" },
  { label: "Careers", href: "/careers" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 dark:border-slate-800 bg-white/90 backdrop-blur dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Button href="/contact">Get a Free Quote</Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 p-2 dark:border-slate-700"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="size-5 dark:text-slate-300" /> : <Menu className="size-5 dark:text-slate-300" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-100 dark:border-slate-800 bg-white px-4 py-4 lg:hidden dark:bg-slate-950">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`text-sm font-medium ${
                  isActive(link.href) ? "text-blue-600 dark:text-blue-400" : "text-slate-600 dark:text-slate-300"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button href="/contact" className="mt-2 w-full">
              Get a Free Quote
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
