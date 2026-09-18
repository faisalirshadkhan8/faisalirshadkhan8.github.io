/**
 * Deployment-level facts. `basePath` mirrors next.config.ts, which reads
 * NEXT_PUBLIC_BASE_PATH from the deploy workflow.
 */
export const site = {
  /** Absolute origin, used for canonical URLs and OG tags. */
  url: "https://example.github.io",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  title: "Your Name — Your Role",
  description:
    "Placeholder description. Replace with one sentence on what you build.",
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
