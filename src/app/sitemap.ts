import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { publishedPosts } from "@/content/blog";
import { absoluteUrl } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/blog/"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    ...projects.map((p) => ({
      url: absoluteUrl(`/projects/${p.slug}/`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...publishedPosts().map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}/`),
      lastModified: new Date(p.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
