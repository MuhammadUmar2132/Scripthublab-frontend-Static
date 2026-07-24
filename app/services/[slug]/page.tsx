import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { SERVICES, TECH_STACK } from "@/data/home";
import Button from "@/components/ui/Button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const PROCESS = [
  { step: "01", title: "Discovery", description: "We learn your goals, users, and constraints before writing a single line." },
  { step: "02", title: "Design", description: "Wireframes and prototypes shaped around how your users actually work." },
  { step: "03", title: "Development", description: "Iterative builds with regular check-ins, so there are no surprises at the end." },
  { step: "04", title: "Delivery & Support", description: "Launch, then ongoing support as your product and users' needs evolve." },
];

function getService(slug: string) {
  return SERVICES.find((service) => service.slug === slug);
}

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return { title: "Service Not Found | ScriptHubLab" };
  }

  return {
    title: `${service.title} | ScriptHubLab Services`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  const otherServices = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);
  const techIcons = TECH_STACK.filter((t) => service.techStack.includes(t.name));

  return (
    <>
      <section className="relative overflow-hidden bg-linear-to-b from-blue-50/60 via-white to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600"
          >
            <ArrowLeft className="size-4" /> Back to Services
          </Link>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <service.icon className="size-7" />
            </div>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              {service.title}
            </h1>
          </div>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-500 dark:text-slate-400">
            {service.description} We start by understanding what your users
            need from this product, then build around that — not the other
            way around.
          </p>

          {techIcons.length > 0 && (
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {techIcons.map((tech) => (
                <span
                  key={tech.name}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 dark:bg-slate-900 dark:text-slate-300"
                >
                  <tech.icon className="size-3.5" />
                  {tech.name}
                </span>
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/contact" withArrow>
              Get Free Consultation
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              What&apos;s Included
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
              {service.title} Services
            </h2>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              Pick what your project needs — every subservice below can stand
              alone or combine with the others.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {service.subservices.map((sub) => (
              <div
                key={sub.slug}
                id={sub.slug}
                className="scroll-mt-24 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white p-6 transition-shadow hover:shadow-lg hover:shadow-slate-200/70 dark:bg-slate-900 dark:hover:shadow-none"
              >
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{sub.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  {sub.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {sub.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-blue-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50/60 py-16 dark:bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              How We Work
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
              Our Process
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((item) => (
              <div key={item.step} className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white p-6 dark:bg-slate-900">
                <span className="text-xs font-bold text-blue-600">{item.step}</span>
                <h3 className="mt-2 text-base font-bold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 p-8 dark:bg-slate-900/60 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Ready to start your {service.title.toLowerCase()} project?
              </h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Tell us about your idea and we&apos;ll get back to you within 1 hour.
              </p>
            </div>
            <Button href="/contact" withArrow>
              Get Free Consultation
            </Button>
          </div>

          {otherServices.length > 0 && (
            <div className="mt-16">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                Explore Other Services
              </h3>
              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                {otherServices.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="group flex items-center gap-3 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white p-5 transition-shadow hover:shadow-lg hover:shadow-slate-200/70 dark:bg-slate-900 dark:hover:shadow-none"
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                      <s.icon className="size-5" />
                    </div>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {s.title}
                    </span>
                    <ArrowRight className="ml-auto size-4 shrink-0 text-slate-300 group-hover:text-blue-600" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
