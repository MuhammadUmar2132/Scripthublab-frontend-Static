"use client";

import React from "react";
import { TECH_STACK } from "@/data/home";

export default function TechStrip() {
  return (
    <section className="border-y border-slate-100 dark:border-slate-800 bg-white py-8 dark:bg-slate-950">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-4 sm:px-6 lg:px-8">
        {TECH_STACK.map((tech, index) => (
          <span
            key={tech.name}
            className="flex items-center gap-2 text-sm font-semibold tracking-wide text-slate-400 transition-all duration-300 hover:text-slate-700 hover:scale-110 animate-fade-in-up"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <tech.icon className="size-5" />
            {tech.name}
          </span>
        ))}
      </div>
    </section>
  );
}
