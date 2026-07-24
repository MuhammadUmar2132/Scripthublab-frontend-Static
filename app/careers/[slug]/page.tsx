import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Briefcase, MapPin, Wallet, Clock } from "lucide-react";
import { getJobBySlug, getJobs } from "@/lib/data";
import ApplyForm from "@/components/careers/ApplyForm";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const jobs = await getJobs();
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobBySlug(slug);

  if (!job) {
    return { title: "Job Not Found | ScriptHubLab" };
  }

  return {
    title: `${job.title} | Careers at ScriptHubLab`,
    description: job.description,
  };
}

export default async function JobDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);

  if (!job || !job.active || new Date(job.expiresAt) < new Date()) notFound();

  const metaItems = [
    { icon: Briefcase, label: "Department", value: job.department },
    { icon: MapPin, label: "Location", value: job.location },
    { icon: Clock, label: "Type", value: job.type },
    { icon: Wallet, label: "Salary", value: job.salaryRange },
  ].filter((item) => item.value);

  return (
    <article className="bg-white py-16 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/careers"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600"
        >
          <ArrowLeft className="size-4" /> Back to Careers
        </Link>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-start">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
              {job.title}
            </h1>

            <div className="mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 p-5 dark:bg-slate-900/60 sm:grid-cols-4">
              {metaItems.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 dark:text-slate-500">
                    <item.icon className="size-3.5" />
                    {item.label}
                  </div>
                  <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">About the Role</h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
                {job.description}
              </p>
            </div>

            {job.requirements?.length > 0 && (
              <div className="mt-8">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">Requirements</h2>
                <ul className="mt-3 space-y-2">
                  {job.requirements.map((req, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300"
                    >
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-blue-600" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white p-6 shadow-xl shadow-slate-200/60 dark:bg-slate-900 dark:shadow-none lg:sticky lg:top-24">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Apply for this Role</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Fill out the form below and we&apos;ll get back to you.
            </p>
            <div className="mt-5">
              <ApplyForm jobTitle={job.title} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
