import React from "react";
import { ChevronDown } from "lucide-react";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export default function Select({ className = "", children, ...props }: SelectProps) {
  return (
    <div className="relative">
      <select
        className={`w-full appearance-none rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:focus:border-blue-400 ${className}`}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
    </div>
  );
}
