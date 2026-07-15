import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import Button from "../ui/Button";
import ContactForm from "../common/ContactForm";
import DashboardMockup from "./DashboardMockup";

const CLIENT_AVATARS = [12, 32, 47, 65];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-blue-50/60 via-white to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-950">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_1.3fr_0.75fr] lg:items-center lg:gap-8 lg:px-8 lg:py-24">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Build Modern Solutions That Drive{" "}
            <span className="text-blue-600">Real Growth</span>
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-slate-500 dark:text-slate-400">
            ScriptHubLab is a software development company delivering
            world-class web, mobile, and cloud solutions for businesses in
            Pakistan and around the globe.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/contact" withArrow>
              Get Free Consultation
            </Button>
            <Button href="/projects" variant="secondary" withArrow>
              View Our Projects
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-3">
              {CLIENT_AVATARS.map((id) => (
                <span
                  key={id}
                  className="relative size-9 overflow-hidden rounded-full border-2 border-white dark:border-slate-950"
                >
                  <Image
                    src={`https://i.pravatar.cc/72?img=${id}`}
                    alt=""
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </span>
              ))}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Trusted by 100+ clients worldwide
              </p>
              <div className="mt-0.5 flex gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-amber-400" />
                ))}
              </div>
            </div>
          </div>
        </div>

        <DashboardMockup />

        <ContactForm className="lg:sticky lg:top-24" />
      </div>
    </section>
  );
}
