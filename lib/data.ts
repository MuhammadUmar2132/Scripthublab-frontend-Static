import type { Project, Blog, Article, Job } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

async function getJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, { cache: "no-store" });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data as T;
  } catch {
    return null;
  }
}

export async function getProjects(): Promise<Project[]> {
  return (await getJson<Project[]>("/projects")) || [];
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return getJson<Project>(`/projects/${slug}`);
}

export async function getBlogs(): Promise<Blog[]> {
  return (await getJson<Blog[]>("/blogs")) || [];
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  return getJson<Blog>(`/blogs/${slug}`);
}

export async function getBlogsByProject(projectId: string): Promise<Blog[]> {
  return (await getJson<Blog[]>(`/blogs?project=${projectId}`)) || [];
}

export async function getArticles(): Promise<Article[]> {
  return (await getJson<Article[]>("/articles")) || [];
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return getJson<Article>(`/articles/${slug}`);
}

export async function getJobs(): Promise<Job[]> {
  return (await getJson<Job[]>("/jobs")) || [];
}

export async function getJobBySlug(slug: string): Promise<Job | null> {
  return getJson<Job>(`/jobs/${slug}`);
}

export function getReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}
