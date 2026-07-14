import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { COMPANY_STATS, COMPANY_VALUES, WHY_CHOOSE_US, TECH_STACK } from "@/data/home";

export const metadata: Metadata = {
  title: "About Us | ScriptHubLab",
  description:
    "Learn who ScriptHubLab is, what we believe in, and why businesses in Pakistan and around the globe trust us to build their software.",
};

const TIMELINE = [
  {
    year: "2020",
    title: "Founded in Pakistan",
    description: "Started as a small team building websites for local businesses.",
  },
  {
    year: "2021",
    title: "Went Full-Stack",
    description: "Expanded into backend systems, mobile apps and cloud infrastructure.",
  },
  {
    year: "2023",
    title: "First SaaS Products",
    description: "Began building and scaling multi-tenant SaaS applications for clients.",
  },
  {
    year: "2026",
    title: "Global Clients",
    description: "Now delivering web, mobile, and AI-driven products for clients worldwide.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-linear-to-b from-blue-50/60 via-white to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
            About Us
          </span>
          <h1 className="mx-auto mt-3 max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            We Build Software That{" "}
            <span className="text-blue-600">Businesses Rely On</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-500 dark:text-slate-400">
            ScriptHubLab is a software development company delivering
            world-class web, mobile, and cloud solutions for businesses in
            Pakistan and around the globe — built around what your users
            actually need.
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

      <section className="border-y border-slate-100 dark:border-slate-800 bg-white py-12 dark:bg-slate-950">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {COMPANY_STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-extrabold text-blue-600 sm:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-20 dark:bg-slate-950">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Our Story
            </span>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-slate-900 dark:text-white sm:text-4xl">
              From a Small Team to a Trusted Development Partner
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              ScriptHubLab started with a simple goal — build software the
              way we&apos;d want it built if we were the client: on time,
              transparent, and genuinely useful to the people who use it
              every day.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Today we work with startups and established businesses alike,
              taking products from a rough idea all the way to a polished,
              scalable launch — and staying on to support them as they grow.
            </p>
          </div>

          <div className="space-y-6 border-l-2 border-blue-100 pl-6">
            {TIMELINE.map((item) => (
              <div key={item.year} className="relative">
                <span className="absolute -left-[31px] top-1 flex size-3 items-center justify-center rounded-full bg-blue-600" />
                <span className="text-xs font-bold text-blue-600">{item.year}</span>
                <h3 className="mt-1 text-base font-bold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50/60 py-20 dark:bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {COMPANY_VALUES.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white p-8 dark:bg-slate-900">
                <div className="flex size-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  <item.icon className="size-6" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Why Choose Us
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
              What Sets Us Apart
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_CHOOSE_US.map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  <item.icon className="size-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-100 dark:border-slate-800 bg-white py-12 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Our Tech Stack
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {TECH_STACK.map((tech) => (
              <span
                key={tech.name}
                className="flex items-center gap-2 text-sm font-semibold tracking-wide text-slate-400 transition-colors hover:text-slate-700"
              >
                <tech.icon className="size-5" />
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 dark:bg-slate-950">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 p-10 dark:bg-slate-900/60 text-center">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-slate-600">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-blue-600" /> Transparent communication
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-blue-600" /> On-time delivery
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-blue-600" /> Ongoing support
              </span>
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
              Let&apos;s Build Something Great Together
            </h3>
            <p className="max-w-xl text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Tell us about your project and we&apos;ll get back to you within 1 hour
              with a clear plan and next steps.
            </p>
            <Button href="/contact" withArrow>
              Get Free Consultation
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
