import React from "react";
import Link from "next/link";
import { Phone, Mail, Globe } from "lucide-react";
import Logo from "./Logo";
import { FacebookIcon, LinkedinIcon, InstagramIcon, TwitterIcon } from "./SocialIcons";
import { SERVICES } from "@/data/home";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Careers", href: "/careers" },
];

const SOCIALS = [
  { icon: FacebookIcon, href: "https://facebook.com" },
  { icon: LinkedinIcon, href: "https://linkedin.com" },
  { icon: InstagramIcon, href: "https://instagram.com" },
  { icon: TwitterIcon, href: "https://twitter.com" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-linear-to-b from-blue-50/60 via-white to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 text-slate-600">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              We are a software development company providing top-notch IT
              solutions to clients worldwide.
            </p>
          </div>

          <FooterColumn title="Quick Links">
            {QUICK_LINKS.map((l) => (
              <FooterLink key={l.label} href={l.href} label={l.label} />
            ))}
          </FooterColumn>

          <FooterColumn title="Services">
            {SERVICES.map((s) => (
              <FooterLink key={s.slug} href={`/services/${s.slug}`} label={s.title} />
            ))}
          </FooterColumn>

          <FooterColumn title="Company">
            {COMPANY_LINKS.map((l) => (
              <FooterLink key={l.label} href={l.href} label={l.label} />
            ))}
          </FooterColumn>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-slate-200 dark:border-slate-800 pt-8 text-sm text-slate-500 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="flex items-center gap-2">
              <Phone className="size-4" /> +92 321 5079537
            </span>
            <span className="flex items-center gap-2">
              <Mail className="size-4" /> hello@scripthublab.com
            </span>
            <span className="flex items-center gap-2">
              <Globe className="size-4" /> www.scripthublab.com
            </span>
          </div>
          <div className="flex items-center gap-3">
            {SOCIALS.map(({ icon: Icon, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-blue-600 hover:text-white dark:bg-slate-800 dark:text-slate-300"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 border-t border-slate-200 dark:border-slate-800 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} ScriptHubLab. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-slate-600">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-600">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{title}</h4>
      <ul className="mt-4 space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link href={href} className="text-sm text-slate-500 dark:text-slate-400 transition-colors hover:text-blue-600 dark:hover:text-blue-400">
        {label}
      </Link>
    </li>
  );
}
