import React from "react";
import Button from "../ui/Button";
import { WHY_CHOOSE_US } from "@/data/home";

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-14 dark:bg-slate-950">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[0.6fr_1.4fr] lg:items-center lg:px-8">
        <div className="rounded-2xl bg-slate-50 p-8 dark:bg-slate-900">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
            Why Choose Us
          </span>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight text-slate-900 dark:text-white sm:text-4xl">
            We Build Solutions That Scale
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            We combine clean code, modern technologies and the best
            practices to deliver high-quality digital products.
          </p>
          <Button href="/about" className="mt-6">
            More About Us
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CHOOSE_US.map((item) => (
            <div key={item.title} className="flex gap-3">
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
  );
}
