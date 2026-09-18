/**
 * Deployment-level facts. `basePath` mirrors next.config.ts, which reads
 * NEXT_PUBLIC_BASE_PATH from the deploy workflow.
 */
export const site = {
  /**
   * Absolute origin, used for canonical URLs and OG tags.
   *
   * Assumes a user site at <username>.github.io, served from the root.
   * If you deploy to a project repo instead (e.g. github.com/you/portfolio),
   * this stays the same but the deploy workflow adds /portfolio as the base
   * path automatically.
   */
  url: "https://faisalirshadkhan8.github.io",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  title: "Muhammad Faisal Irshad — Software Engineer",
  description:
    "Muhammad Faisal Irshad is a Software Engineer in Lahore, Pakistan. I build production backends and AI agent systems with Python, FastAPI, Next.js, LangChain and CrewAI.",
  locale: "en_US",
} as const;

/** Prefixes a /public path with the basePath so it resolves on Pages. */
export function asset(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${site.basePath}${clean}`;
}

/** Absolute URL for canonical + OG metadata. */
export function absoluteUrl(path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${site.url}${site.basePath}${clean}`;
}
