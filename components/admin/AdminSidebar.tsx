"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Newspaper,
  FileText,
  Mail,
  Users,
  Briefcase,
  UserCheck,
  LogOut,
} from "lucide-react";
import Logo from "../common/Logo";

const LINKS = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban },
  { label: "Blogs", href: "/admin/blogs", icon: Newspaper },
  { label: "Articles", href: "/admin/articles", icon: FileText },
  { label: "Careers", href: "/admin/careers", icon: Briefcase },
  { label: "Applications", href: "/admin/applications", icon: UserCheck },
  { label: "Messages", href: "/admin/messages", icon: Mail },
  { label: "Subscribers", href: "/admin/subscribers", icon: Users },
];

export default function AdminSidebar({ onLogout }: { onLogout: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-slate-100 bg-white">
      <div className="border-b border-slate-100 px-5 py-5">
        <Logo />
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {LINKS.map((link) => {
          const active = pathname?.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <link.icon className="size-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-100 p-3">
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
        >
          <LogOut className="size-4" /> Log Out
        </button>
      </div>
    </aside>
  );
}
