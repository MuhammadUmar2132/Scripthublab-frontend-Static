import React from "react";
import Link from "next/link";
import { ArrowRight, Phone, Mail, Globe } from "lucide-react";
import { getArticles } from "@/lib/data";
import Thumbnail from "../common/Thumbnail";
import { FacebookIcon, LinkedinIcon, InstagramIcon, TwitterIcon } from "../common/SocialIcons";

const SOCIALS = [
  { icon: FacebookIcon, href: "https://facebook.com" },
  { icon: LinkedinIcon, href: "https://linkedin.com" },
  { icon: InstagramIcon, href: "https://instagram.com" },
  { icon: TwitterIcon, href: "https://twitter.com" },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export default async function Articles() {
  const articles = (await getArticles()).slice(0, 4);

  return (
    <section className="bg-white py-20 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              From Our Articles
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
              Latest Articles
            </h2>
          </div>
          <Link
            href="/articles"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600"
          >
            View All Articles <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[2.9fr_1fr]">
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {articles.map((article) => (
                <article
                  key={article._id}
                  className="overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800 bg-white transition-shadow hover:shadow-lg hover:shadow-slate-200/70 dark:bg-slate-900 dark:hover:shadow-none"
                >
                  <div className="h-28 w-full overflow-hidden">
                    <Thumbnail image={article.image} title={article.title} />
                  </div>
                  <div className="p-4">
                    <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold text-slate-400 dark:text-slate-500">
                      <span className="rounded-full bg-blue-50 px-2 py-0.5 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                        {article.category}
                      </span>
                      <span>{formatDate(article.createdAt)}</span>
                    </div>
                    <h3 className="mt-2.5 text-xs font-bold leading-snug text-slate-900 dark:text-white">
                      {article.title}
                    </h3>
                    <Link
                      href={`/articles/${article.slug}`}
                      className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600"
                    >
                      Read More <ArrowRight className="size-3" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center rounded-2xl border border-dashed border-slate-200 p-10 text-sm text-slate-400 dark:text-slate-500">
              No articles published yet.
            </div>
          )}

          <div className="h-fit rounded-2xl border border-slate-100 dark:border-slate-800 bg-white p-6 shadow-xl shadow-slate-200/60 dark:bg-slate-900 dark:shadow-none">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Let&apos;s Build Something Great Together
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Have a project in mind? Let&apos;s discuss your idea and turn it
              into a powerful digital solution.
            </p>

            <div className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <a href="tel:+923215079537" className="flex items-center gap-2.5 hover:text-blue-600">
                <Phone className="size-4" /> +92 321 5079537
              </a>
              <a href="mailto:hello@scripthublab.com" className="flex items-center gap-2.5 hover:text-blue-600">
                <Mail className="size-4" /> hello@scripthublab.com
              </a>
              <a href="https://scripthublab.com" className="flex items-center gap-2.5 hover:text-blue-600">
                <Globe className="size-4" /> www.scripthublab.com
              </a>
            </div>

            <div className="mt-6 flex items-center gap-3">
              {SOCIALS.map(({ icon: Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-9 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-colors hover:bg-blue-600 hover:text-white dark:bg-blue-500/10 dark:text-blue-400"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
