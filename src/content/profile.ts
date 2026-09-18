import type { Profile, SkillBlock, ImpactStat, StatusLine } from "./types";

/**
 * TODO: replace every value below with your own details.
 * Nothing here is inferred from anywhere else — this file is the source
 * of truth for identity across the whole site.
 */
export const profile: Profile = {
  name: "Your Name",
  nameLines: ["Your", "Name"],
  initials: "yn",
  role: "Software Engineer",
  tagline:
    "One or two sentences on what you build and where you build it. This sits beside the portrait in the hero.",
  location: "City, Country",
  email: "you@example.com",
  resumeHref: null,
  portrait: null,
  socials: [
    { kind: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/your-handle/" },
    { kind: "github", label: "GitHub", href: "https://github.com/your-handle" },
    { kind: "email", label: "Email", href: "mailto:you@example.com" },
  ],
};

export const skills: SkillBlock[] = [
  {
    title: "backend",
    body: "TODO: two sentences on the server-side work you do and the tools you reach for.",
  },
  {
    title: "frontend",
    body: "TODO: two sentences on the client-side work you do and how you approach it.",
  },
];

export const impact: ImpactStat[] = [
  { value: "00", suffix: "%", label: "TODO: a measurable outcome you delivered" },
  { value: "00", suffix: "+", label: "TODO: a volume or scale figure" },
  { value: "0", label: "TODO: a count — companies, products, years" },
];

export const statusLines: StatusLine[] = [
  { icon: "microscope", verb: "Building", text: "your-current-thing.com", href: "https://example.com" },
  { icon: "users", verb: "Shipped", text: "something-you-launched.com", href: "https://example.com" },
  { icon: "bolt", verb: "Focused on", text: "TODO: your current area of depth" },
];

export const funFact =
  "TODO: one line of personality. The original ends with an emoji 🚀";

/** Three short paragraphs in your own voice. */
export const readme: string[] = [
  "TODO: opening paragraph — what kind of engineer you are and what you gravitate toward.",
  "TODO: middle paragraph — where you work now and what you actually build there.",
  "TODO: closing paragraph — the through-line of your career so far.",
];
