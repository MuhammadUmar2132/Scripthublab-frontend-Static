"use client";

import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import Button from "../ui/Button";
import ContactForm from "../common/ContactForm";
import DashboardMockup from "./DashboardMockup";
import WhatsAppButton from "../common/WhatsAppButton";

const CLIENT_AVATARS = [12, 32, 47, 65];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-blue-50/60 via-white to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-950">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_1.3fr_0.75fr] lg:items-center lg:gap-8 lg:px-8 lg:py-24">
        <div className="animate-fade-in-up text-center">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-4xl">
            Custom Web & App Development Services That Drive{" "}
            <span className="text-blue-600">Real Growth</span>
          </h1>
          <p className="mt-5 mx-auto max-w-md text-base leading-relaxed text-slate-500 dark:text-slate-400 sm:text-sm">
            ScriptHubLab is a software development company delivering
            world-class web, mobile, and cloud solutions for businesses in
            Pakistan and around the globe.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 w-full">
            <Button href="/contact" withArrow className="w-[80%] mx-auto sm:w-auto transition-transform duration-300 hover:scale-105 text-base sm:text-lg px-6 py-4">
              Get Free Consultation
            </Button>
            <Button
              href="https://wa.me/923215079537"
              className="w-[80%] mx-auto sm:w-auto bg-green-600 text-white hover:bg-green-700 shadow-sm shadow-green-600/20 transition-transform duration-300 hover:scale-105 text-base sm:text-lg px-6 py-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </Button>
          </div>

          <div className="mt-10 flex justify-center items-center gap-4">
            <div className="flex -space-x-3">
              {CLIENT_AVATARS.map((id) => (
                <span
                  key={id}
                  className="relative size-9 overflow-hidden rounded-full border-2 border-white dark:border-slate-950 sm:size-10"
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
                  <Star key={i} className="size-3.5 fill-amber-400 sm:size-4" />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <DashboardMockup />
        </div>

        <div className="lg:hidden animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <ContactForm />
        </div>
        <div className="hidden lg:block animate-fade-in-up lg:sticky lg:top-24" style={{ animationDelay: '0.4s' }}>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
