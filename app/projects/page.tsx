import type { Metadata } from "next";
import Link from "next/link";
import { getProjects } from "@/lib/data";
import Thumbnail from "@/components/common/Thumbnail";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Our Projects | ScriptHubLab",
  description:
    "Explore web, mobile and SaaS projects delivered by ScriptHubLab for clients in Pakistan and around the globe.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <section className="relative overflow-hidden bg-linear-to-b from-blue-50/60 via-white to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
            Our Projects
          </span>
          <h1 className="mx-auto mt-3 max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Work We&apos;re <span className="text-blue-600">Proud Of</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-500 dark:text-slate-400">
            A selection of web, mobile and SaaS products we&apos;ve built for
            clients in Pakistan and around the globe.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/contact" withArrow>
              Get Free Consultation
            </Button>
            <Button href="/services" variant="secondary" withArrow>
              Explore Our Services
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {projects.length === 0 ? (
          <p className="mt-12 text-center text-sm text-slate-400 dark:text-slate-500">No projects published yet.</p>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Link
                key={project._id}
                href={`/projects/${project.slug}`}
                className="group overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800 bg-white transition-shadow hover:shadow-lg hover:shadow-slate-200/70 dark:bg-slate-900 dark:hover:shadow-none"
              >
                <div className="h-44 w-full overflow-hidden">
                  <Thumbnail
                    image={project.image}
                    title={project.title}
                    className="transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">{project.title}</h3>
                  <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">{project.category}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
        </div>
      </section>
    </>
  );
}
