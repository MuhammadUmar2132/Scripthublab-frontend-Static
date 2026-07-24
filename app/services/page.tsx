import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/data/home";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Our Services | ScriptHubLab",
  description:
    "Explore web, mobile, backend, SaaS, design and AI integration services delivered by ScriptHubLab for clients worldwide.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-linear-to-b from-blue-50/60 via-white to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
            What We Do
          </span>
          <h1 className="mx-auto mt-3 max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Services Built to Drive <span className="text-blue-600">Real Growth</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-500 dark:text-slate-400">
            End-to-end digital solutions — from web and mobile apps to SaaS
            products, design, and AI integration — built around what your
            business and your users actually need.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/contact" withArrow>
              Get Free Consultation
            </Button>
            <Button href="/projects" variant="secondary" withArrow>
              View Our Projects
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <div
                key={service.slug}
                className="group flex flex-col rounded-2xl border border-slate-100 dark:border-slate-800 bg-white p-6 transition-shadow hover:shadow-lg hover:shadow-slate-200/70 dark:bg-slate-900 dark:hover:shadow-none"
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  <service.icon className="size-5" />
                </div>
                <h2 className="mt-4 text-base font-bold text-slate-900 dark:text-white">{service.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  {service.description}
                </p>

                <ul className="mt-4 space-y-1.5">
                  {service.subservices.map((sub) => (
                    <li key={sub.slug}>
                      <Link
                        href={`/services/${service.slug}#${sub.slug}`}
                        className="text-xs font-medium text-slate-500 dark:text-slate-400 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        {sub.title}
                      </Link>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/services/${service.slug}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600"
                >
                  Learn More <ArrowRight className="size-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
