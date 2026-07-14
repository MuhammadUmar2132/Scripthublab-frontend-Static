import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getBlogBySlug } from "@/lib/data";
import Thumbnail from "@/components/common/Thumbnail";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getBlogBySlug(slug);

  if (!article) {
    return { title: "Article Not Found | ScriptHubLab" };
  }

  return {
    title: `${article.title} | ScriptHubLab Blog`,
    description: article.excerpt,
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getBlogBySlug(slug);

  if (!article) notFound();

  return (
    <article className="bg-white py-16 dark:bg-slate-950">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600">
          <ArrowLeft className="size-4" /> Back to Blog
        </Link>

        <div className="mt-6 flex items-center gap-3 text-xs font-semibold text-slate-400 dark:text-slate-500">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">{article.category}</span>
          <span>{formatDate(article.createdAt)}</span>
          <span>by {article.author}</span>
        </div>

        <h1 className="mt-4 text-3xl font-extrabold leading-tight text-slate-900 dark:text-white sm:text-4xl">
          {article.title}
        </h1>

        <div className="mt-8 h-72 w-full overflow-hidden rounded-2xl sm:h-96">
          <Thumbnail image={article.image} title={article.title} />
        </div>

        <p className="mt-8 text-lg leading-relaxed text-slate-500 dark:text-slate-400">{article.excerpt}</p>

        <div className="mt-6 whitespace-pre-line text-base leading-relaxed text-slate-700">
          {article.content}
        </div>
      </div>
    </article>
  );
}
