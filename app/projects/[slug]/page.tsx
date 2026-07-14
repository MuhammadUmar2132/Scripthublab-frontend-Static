import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, User, Calendar, Briefcase } from "lucide-react";
import { getProjectBySlug, getBlogsByProject, getReadingTime } from "@/lib/data";
import Thumbnail from "@/components/common/Thumbnail";
import { getTechIcon } from "@/lib/techIcons";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found | ScriptHubLab" };
  }

  return {
    title: `${project.title} | ScriptHubLab Projects`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  const relatedBlogs = (await getBlogsByProject(project._id)).slice(0, 4);

  const metaItems = [
    { icon: User, label: "Client", value: project.client },
    { icon: Calendar, label: "Duration", value: project.duration },
    { icon: Briefcase, label: "Role", value: project.role },
  ].filter((item) => item.value);

  return (
    <article className="bg-white py-16 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600"
        >
          <ArrowLeft className="size-4" /> Back to Projects
        </Link>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-start">
          <div>
            <div className="h-72 w-full overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800 sm:h-96">
              <Thumbnail image={project.image} title={project.title} />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                {project.category}
              </span>
              {project.featured && (
                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-600">
                  Featured
                </span>
              )}
            </div>

            <h1 className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
              {project.title}
            </h1>

            <p className="mt-4 text-base leading-relaxed text-slate-600">{project.description}</p>

            {(metaItems.length > 0 || project.liveUrl) && (
              <div className="mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 p-5 dark:bg-slate-900/60 sm:grid-cols-4">
                {metaItems.map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 dark:text-slate-500">
                      <item.icon className="size-3.5" />
                      {item.label}
                    </div>
                    <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">{item.value}</p>
                  </div>
                ))}
                {project.liveUrl && (
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 dark:text-slate-500">
                      <ExternalLink className="size-3.5" />
                      Live Demo
                    </div>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block truncate text-sm font-semibold text-blue-600 hover:text-blue-700"
                    >
                      {project.liveUrl.replace(/^https?:\/\//, "")}
                    </a>
                  </div>
                )}
              </div>
            )}

            {project.tags?.length > 0 && (
              <div className="mt-8">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">Tech Stack</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map((tag) => {
                    const Icon = getTechIcon(tag);
                    return (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600"
                      >
                        {Icon && <Icon className="size-3.5" />}
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Visit Live Project <ExternalLink className="size-4" />
              </a>
            )}
          </div>

          {relatedBlogs.length > 0 && (
            <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white p-5 dark:bg-slate-900 lg:sticky lg:top-24">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Case Study Blogs ({relatedBlogs.length})
              </h2>

              <div className="mt-4 space-y-4">
                {relatedBlogs.map((blog) => (
                  <Link
                    key={blog._id}
                    href={`/blog/${blog.slug}`}
                    className="group flex gap-3 rounded-xl p-2 -mx-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/60"
                  >
                    <div className="size-14 shrink-0 overflow-hidden rounded-lg">
                      <Thumbnail image={blog.image} title={blog.title} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold leading-snug text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {blog.title}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-2">
                        {blog.excerpt}
                      </p>
                      <p className="mt-1.5 text-[11px] font-medium text-slate-400 dark:text-slate-500">
                        {getReadingTime(blog.content)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              <Link
                href="/blog"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                View All Blogs <ArrowRight className="size-3.5" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
