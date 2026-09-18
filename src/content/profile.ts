import type { Profile, SkillBlock, ImpactStat, StatusLine } from "./types";

export const profile: Profile = {
  name: "Muhammad Faisal Irshad",
  // The hero animates one line per entry. "Faisal Irshad" is what people
  // call you, so it leads; the full name stays in metadata and JSON-LD.
  nameLines: ["Faisal", "Irshad"],
  initials: "fi",
  role: "Associate Software Engineer",
  tagline:
    "Software Engineer in Lahore, building production backends and AI agent systems with Python, FastAPI and Next.js — currently shipping three apps on a commercial AI Operating System.",
  location: "Lahore, Pakistan",
  email: "faisalirshadkhan8@gmail.com",
  resumeHref: "/assets/Faisal_CV_SE__LHR_.pdf",
  portrait: null,
  socials: [
    {
      kind: "linkedin",
      label: "LinkedIn",
      href: "https://linkedin.com/in/faisal-irshad-software-engineer",
    },
    {
      kind: "github",
      label: "GitHub",
      href: "https://github.com/faisalirshadkhan8",
    },
    { kind: "email", label: "Email", href: "mailto:faisalirshadkhan8@gmail.com" },
  ],
};

export const skills: SkillBlock[] = [
  {
    title: "backend",
    body: "I build production APIs with FastAPI, Django and DRF on PostgreSQL, structured around DTOs and use cases so the business logic stays testable. Celery, Redis and cron jobs handle the work that shouldn't block a request, and Docker plus GitHub Actions get it deployed.",
  },
  {
    title: "ai systems",
    body: "MCP servers, RAG pipelines and agent workflows with LangChain and CrewAI — including a workflow orchestrator that sequences agent steps, survives a dropped connection, and pauses for human review before it continues.",
  },
  {
    title: "frontend",
    body: "Next.js, React and Tailwind for the interfaces on top: no-code workflow builders, analytics dashboards and admin tooling that non-technical users actually operate day to day.",
  },
];

export const impact: ImpactStat[] = [
  {
    value: "3",
    label: "Production applications owned and shipped in parallel, as sole developer",
  },
  {
    value: "143",
    suffix: "+",
    label: "Automated tests written for synQ, with CI/CD through GitHub Actions",
  },
  {
    value: "29",
    suffix: "+",
    label: "Public repositories across backend, AI agent and full-stack work",
  },
];

export const statusLines: StatusLine[] = [
  {
    icon: "microscope",
    verb: "Building",
    text: "implementai.io",
    href: "https://implementai.io/",
  },
  {
    icon: "bolt",
    verb: "Shipped",
    text: "a read-only MCP server, validated end to end with Claude",
  },
  {
    icon: "users",
    verb: "Serving",
    text: "clients across the UK, Ireland and UAE",
  },
  {
    icon: "seedling",
    verb: "Finishing",
    text: "BS Software Engineering at Superior University",
  },
];

export const funFact =
  "I built and now maintain three production apps at once — Core, Portal and Admin — as the only developer on each 🚀";

export const readme: string[] = [
  "I'm a Software Engineer who likes the part of the job that has to keep working when nobody is watching: the run that resumes after a dropped connection, the permission check that holds at every layer, the webhook that reconciles whether or not the user stayed on the page. Most of what I've shipped lives there.",
  "At Techanzy I work on Implement AI, a commercial AI Operating System with clients in the UK, Ireland and UAE. I own three production applications on it — AIOS Core for internal analytics and operations, AIOS Portal for no-code agent workflows, and the Admin App for payments, security and access control — each built as the sole developer, in a PR workflow where every change goes through team lead review.",
  "The through-line is ownership. I'd rather hold a system end to end — architecture, implementation, deployment and the maintenance months later — than hand it off at the boundary. Clean architecture, DTOs and use cases aren't ceremony to me; they're what makes that ownership survivable.",
];
