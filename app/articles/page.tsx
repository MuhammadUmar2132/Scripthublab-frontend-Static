import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getArticles } from "@/lib/data";
import Thumbnail from "@/components/common/Thumbnail";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Articles | ScriptHubLab",
  description: "Case-study articles and deep dives from the ScriptHubLab team.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <>
      <section className="relative overflow-hidden bg-linear-to-b from-blue-50/60 via-white to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
            Case Studies
          </span>
          <h1 className="mx-auto mt-3 max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Deep Dives Behind Our <span className="text-blue-600">Best Work</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-500 dark:text-slate-400">
            In-depth write-ups behind the projects we&apos;ve built — the
            problems, the decisions, and what we&apos;d do again.
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
        {articles.length === 0 ? (
          <p className="mt-12 text-center text-sm text-slate-400 dark:text-slate-500">No articles published yet.</p>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <article
                key={article._id}
                className="overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800 bg-white transition-shadow hover:shadow-lg hover:shadow-slate-200/70 dark:bg-slate-900 dark:hover:shadow-none"
              >
                <div className="h-40 w-full overflow-hidden">
                  <Thumbnail image={article.image} title={article.title} />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-400 dark:text-slate-500">
                    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                      {article.category}
                    </span>
                    <span>{formatDate(article.createdAt)}</span>
                  </div>
                  <h2 className="mt-3 text-sm font-bold leading-snug text-slate-900 dark:text-white">
                    {article.title}
                  </h2>
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{article.excerpt}</p>
                  <Link
                    href={`/articles/${article.slug}`}
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600"
                  >
                    Read More <ArrowRight className="size-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
        </div>
      </section>
    </>
  );
}
