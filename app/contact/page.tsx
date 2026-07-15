import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { FacebookIcon, LinkedinIcon, InstagramIcon, TwitterIcon } from "@/components/common/SocialIcons";

export const metadata: Metadata = {
  title: "Contact Us | ScriptHubLab",
  description:
    "Get in touch with ScriptHubLab for your next web, mobile, or SaaS project. We reply within 1 hour.",
};

const CONTACT_INFO = [
  {
    icon: Phone,
    label: "Call Us",
    value: "+92 321 5079537",
    href: "tel:+923215079537",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+92 321 5079537",
    href: "https://wa.me/923215079537",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "hello@scripthublab.com",
    href: "mailto:hello@scripthublab.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Lahore, Pakistan",
    href: undefined,
  },
];

const SOCIALS = [
  { icon: FacebookIcon, href: "https://facebook.com" },
  { icon: LinkedinIcon, href: "https://linkedin.com" },
  { icon: InstagramIcon, href: "https://instagram.com" },
  { icon: TwitterIcon, href: "https://twitter.com" },
];

const FAQS = [
  {
    question: "How soon will I hear back?",
    answer: "We reply to every inquiry within 1 hour, usually much sooner.",
  },
  {
    question: "Do you sign an NDA before discussing my project?",
    answer: "Yes, we're happy to sign an NDA before any detailed discussion.",
  },
  {
    question: "Can you work with my existing team or codebase?",
    answer: "Absolutely — we regularly join existing projects and teams.",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-linear-to-b from-blue-50/60 via-white to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
            Get In Touch
          </span>
          <h1 className="mx-auto mt-3 max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Let&apos;s Build Your{" "}
            <span className="text-blue-600">Next Project</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-500 dark:text-slate-400">
            Tell us about your idea and we&apos;ll get back to you within 1
            hour with a clear plan and next steps.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-slate-950">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {CONTACT_INFO.map((item) => {
                  const Wrapper = item.href ? "a" : "div";
                  return (
                    <Wrapper
                      key={item.label}
                      {...(item.href
                        ? {
                            href: item.href,
                            target: item.href.startsWith("http") ? "_blank" : undefined,
                            rel: item.href.startsWith("http") ? "noopener noreferrer" : undefined,
                          }
                        : {})}
                      className="group rounded-2xl border border-slate-100 dark:border-slate-800 bg-white p-5 transition-shadow hover:shadow-lg hover:shadow-slate-200/70 dark:bg-slate-900 dark:hover:shadow-none"
                    >
                      <div className="flex size-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                        <item.icon className="size-5" />
                      </div>
                      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                        {item.label}
                      </p>
                      <p className="mt-1 text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {item.value}
                      </p>
                    </Wrapper>
                  );
                })}
              </div>

              <div className="mt-6 flex items-center gap-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 p-5 dark:bg-slate-900/60">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Clock className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Fast Response Time</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    We reply to every message within 1 hour.
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                  Follow Us
                </p>
                <div className="mt-3 flex items-center gap-3">
                  {SOCIALS.map(({ icon: Icon, href }) => (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex size-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-blue-600 hover:text-white dark:bg-slate-800 dark:text-slate-300"
                    >
                      <Icon className="size-4" />
                    </a>
                  ))}
                </div>
              </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50/60 py-16 dark:bg-slate-900/40">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              FAQs
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
              Common Questions
            </h2>
          </div>

          <div className="mt-10 space-y-4">
            {FAQS.map((faq) => (
              <div
                key={faq.question}
                className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white p-6 dark:bg-slate-900"
              >
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{faq.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
