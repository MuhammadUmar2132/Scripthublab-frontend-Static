import type { Project, Blog, Article, Job } from "./types";
import { PROJECTS, BLOGS, ARTICLES, JOBS } from "@/data/content";

export async function getProjects(): Promise<Project[]> {
  return PROJECTS;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return PROJECTS.find((p) => p.slug === slug) || null;
}

export async function getBlogs(): Promise<Blog[]> {
  return BLOGS.filter((b) => b.published);
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  return BLOGS.find((b) => b.slug === slug && b.published) || null;
}

export async function getBlogsByProject(projectId: string): Promise<Blog[]> {
  return BLOGS.filter((b) => b.published && b.project === projectId);
}

export async function getArticles(): Promise<Article[]> {
  return ARTICLES.filter((a) => a.published);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return ARTICLES.find((a) => a.slug === slug && a.published) || null;
}

export async function getJobs(): Promise<Job[]> {
  return JOBS.filter((j) => j.active);
}

export async function getJobBySlug(slug: string): Promise<Job | null> {
  return JOBS.find((j) => j.slug === slug) || null;
}

export function getReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}
