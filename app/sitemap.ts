import type { MetadataRoute } from "next";
import { getProjects, getBlogs } from "@/lib/data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, blogs] = await Promise.all([getProjects(), getBlogs()]);

  const staticRoutes = ["", "/projects", "/blog", "/services", "/about", "/contact"].map(
    (path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: new Date(),
    })
  );

  const projectRoutes = projects.map((p) => ({
    url: `${SITE_URL}/projects/${p.slug}`,
    lastModified: new Date(p.updatedAt),
  }));

  const blogRoutes = blogs.map((b) => ({
    url: `${SITE_URL}/blog/${b.slug}`,
    lastModified: new Date(b.updatedAt),
  }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
