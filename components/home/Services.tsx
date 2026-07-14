import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/data/home";

export default function Services() {
  return (
    <section className="bg-white py-20 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
            What We Do
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            We provide end-to-end digital solutions to help your business
            succeed in the modern world.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {SERVICES.map((service) => (
            <div
              key={service.slug}
              className="group rounded-2xl border border-slate-100 dark:border-slate-800 bg-white p-5 transition-shadow hover:shadow-lg hover:shadow-slate-200/70 dark:bg-slate-900 dark:hover:shadow-none"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                <service.icon className="size-5" />
              </div>
              <h3 className="mt-4 text-sm font-bold text-slate-900 dark:text-white">{service.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                {service.description}
              </p>
              <Link
                href={`/services/${service.slug}`}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600"
              >
                Learn More <ArrowRight className="size-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
