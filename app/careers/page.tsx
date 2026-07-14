import type { Metadata } from "next";
import Link from "next/link";
import { Briefcase, MapPin, ArrowRight } from "lucide-react";
import { getJobs } from "@/lib/data";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Careers | ScriptHubLab",
  description: "Join ScriptHubLab — explore open roles in web, mobile and cloud development.",
};

export default async function CareersPage() {
  const jobs = await getJobs();

  return (
    <>
      <section className="relative overflow-hidden bg-linear-to-b from-blue-50/60 via-white to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
            Careers
          </span>
          <h1 className="mx-auto mt-3 max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Build Your Career With <span className="text-blue-600">ScriptHubLab</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-500 dark:text-slate-400">
            We're always looking for talented people to join our team. Explore
            our open roles below.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-slate-950">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {jobs.length === 0 ? (
            <p className="text-center text-sm text-slate-400 dark:text-slate-500">
              No open positions right now. Check back soon!
            </p>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <Link
                  key={job._id}
                  href={`/careers/${job.slug}`}
                  className="group flex flex-col gap-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white p-6 transition-shadow hover:shadow-lg hover:shadow-slate-200/70 dark:bg-slate-900 dark:hover:shadow-none sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {job.title}
                    </h3>
                    <div className="mt-2 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Briefcase className="size-3.5" /> {job.department}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="size-3.5" /> {job.location}
                      </span>
                      <span className="rounded-full bg-blue-50 px-2.5 py-1 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600">
                    View Role <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Button href="/contact" withArrow>
              Don&apos;t See Your Role? Get in Touch
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
