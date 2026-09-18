import type { Project } from "./types";

/**
 * TODO: replace with your own work. Each entry generates a card on the
 * home page and a static route at /projects/<slug>/.
 *
 * `visual` picks the card art:
 *   - gradient  : flat two-tone tile. Honest choice for work behind a login.
 *   - diagram   : an SVG in /public/assets/images/arch/.
 *   - image     : a screenshot in /public/assets/images/projects/.
 */
export const projects: Project[] = [
  {
    slug: "project-one",
    name: "Project One",
    stack: ["React", "TypeScript", "PostgreSQL"],
    summary:
      "TODO: one or two sentences on what this is and what it does for whoever uses it.",
    category: "Web Applications",
    href: "https://example.com",
    visual: { kind: "gradient", from: "#4a6fb5", to: "#2f4a7d" },
    order: 1,
    detail: {
      problem: "TODO: what was broken or missing before this existed.",
      approach: "TODO: what you built and the decisions that mattered.",
      outcome: "TODO: what changed once it shipped. Numbers if you have them.",
      highlights: [
        "TODO: a specific thing you built",
        "TODO: another specific thing",
      ],
    },
  },
  {
    slug: "project-two",
    name: "Project Two",
    stack: ["Next.js", "Node.js", "Redis"],
    summary: "TODO: one or two sentences.",
    category: "Web Applications",
    tag: "Client work · access restricted",
    visual: { kind: "gradient", from: "#3f7a6d", to: "#26514a" },
    order: 2,
    detail: {
      problem: "TODO",
      approach: "TODO",
      outcome: "TODO",
    },
  },
  {
    slug: "project-three",
    name: "Project Three",
    stack: ["Python", "FastAPI", "Celery"],
    summary: "TODO: one or two sentences.",
    category: "Systems",
    visual: { kind: "gradient", from: "#ab5838", to: "#743722" },
    order: 3,
    detail: { problem: "TODO", approach: "TODO", outcome: "TODO" },
  },
];

/** Category order on the home page; unlisted categories follow, alphabetically. */
export const categoryOrder = ["Web Applications", "Systems"];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Projects grouped into the sections the home page renders. */
export function projectsByCategory(): { category: string; items: Project[] }[] {
  const groups = new Map<string, Project[]>();
  for (const p of projects) {
    const list = groups.get(p.category) ?? [];
    list.push(p);
    groups.set(p.category, list);
  }

  const rank = (c: string) => {
    const i = categoryOrder.indexOf(c);
    return i === -1 ? categoryOrder.length : i;
  };

  return [...groups.entries()]
    .sort(([a], [b]) => rank(a) - rank(b) || a.localeCompare(b))
    .map(([category, items]) => ({
      category,
      items: items.sort((x, y) => (x.order ?? 0) - (y.order ?? 0)),
    }));
}
