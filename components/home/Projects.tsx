import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProjects } from "@/lib/data";
import Thumbnail from "../common/Thumbnail";

export default async function Projects() {
  const projects = (await getProjects()).slice(0, 6);

  return (
    <section className="bg-white py-20 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Our Projects
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
              Recent Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600"
          >
            View All Projects <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {projects.map((project) => (
            <Link
              key={project._id}
              href={`/projects/${project.slug}`}
              className="group overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800 bg-white transition-shadow hover:shadow-lg hover:shadow-slate-200/70 dark:bg-slate-900 dark:hover:shadow-none"
            >
              <div className="h-28 w-full overflow-hidden">
                <Thumbnail
                  image={project.image}
                  title={project.title}
                  className="transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xs font-bold leading-snug text-slate-900 dark:text-white">{project.title}</h3>
                <p className="mt-1 text-[11px] font-medium text-slate-500 dark:text-slate-400">{project.category}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
