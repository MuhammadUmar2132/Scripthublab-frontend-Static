import React from "react";
import Link from "next/link";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 48 48"
        className="size-10 shrink-0 text-blue-600 dark:text-blue-400"
        aria-hidden="true"
      >
        <path
          d="M24 2 44 13v22L24 46 4 35V13Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <text
          x="24"
          y="31"
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontWeight="700"
          fontSize="20"
          fill="currentColor"
        >
          S
        </text>
      </svg>
      <span className="leading-tight">
        <span className="block text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
          ScriptHub<span className="text-blue-600 dark:text-blue-400">Lab</span>
        </span>
        <span className="block text-[10px] font-medium tracking-wide text-slate-400 dark:text-slate-500">
          Build. Scale. Innovate.
        </span>
      </span>
    </Link>
  );
}
