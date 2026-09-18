import type {
  Profile,
  SkillBlock,
  ImpactStat,
  StatusLine,
  Job,
} from "./types";

export const profile: Profile = {
  name: "Muhammad Faisal Irshad",
  // The hero animates one line per entry. "Faisal Irshad" is what people
  // call you, so it leads; the full name stays in metadata and JSON-LD.
  nameLines: ["Faisal", "Irshad"],
  initials: "fi",
  role: "Associate Software Engineer",
  // Shorter than before: at a comfortable measure this is two lines, and
  // the stack it used to name is now its own meta row.
  tagline:
    "I build production backends and AI agent systems, and I own them end to end: architecture, deployment, and the maintenance months later.",
  location: "Lahore, Pakistan",
  email: "faisalirshadkhan8@gmail.com",
  heroStack: ["Python", "FastAPI", "Next.js", "Supabase", "LangChain"],
  // Null hides it. The same fact is already the "3" stat and appears in
  // the bio, so the hero does not need to say it a third time.
  heroProof: null,
  /*
    Written from the sender's side, with blanks marked so it is obvious
    what to fill in. A starter body is the whole point: a blank compose
    window is where most "I'll email them later" intentions die.
  */
  contactReasons: [
    {
      label: "Hiring",
      subject: "Role at [company]",
      body:
        "Hi Faisal,\n\n" +
        "We're hiring and your work looked like a fit.\n\n" +
        "Role: \n" +
        "Stack: \n" +
        "Location / remote: \n\n" +
        "Happy to share more.\n\n" +
        "— ",
    },
    {
      label: "Freelance",
      subject: "Project I'd like your help with",
      body:
        "Hi Faisal,\n\n" +
        "I have a project I think you'd be right for.\n\n" +
        "What it is: \n" +
        "Rough timeline: \n" +
        "Budget range: \n\n" +
        "— ",
    },
    {
      label: "Just saying hi",
      subject: "Hello from your portfolio",
      body:
        "Hi Faisal,\n\n" +
        "Came across your portfolio and wanted to say hello.\n\n" +
        "— ",
    },
  ],
  /*
    Cal.com booking link, "username/event-slug". Null removes every
    booking affordance, including the dock pill.

    Note: the snippet Cal.com generates carries whatever username was in
    effect when the event was made, so it still said
    faisal-irshad-khan-ay5jnl and 404s. This is the corrected link.
  */
  calLink: "faisal-irshad/book-a-call-with-faisal",
  /** Cal.com namespace, as shown in their embed snippet. */
  calNamespace: "book-a-call-with-faisal",
  resumeHref: "/assets/Faisal_CV_SE__LHR_.pdf",
  // Illustrated avatar at rest; the real photograph on the reverse.
  avatar: "/assets/images/avatar.webp",
  portrait: "/assets/images/portrait.webp",
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

/**
 * Employment history. Techanzy's clients are Techanzy's, not his: this
 * section exists so the AIOS applications read unambiguously as work
 * done for an employer.
 */
export const experience: Job[] = [
  {
    company: "Techanzy Limited",
    // The employer, not the product. implementai.io is linked from the
    // summary and the status lines instead.
    href: "https://www.techanzy.com/",
    role: "Associate Software Engineer",
    period: "Feb 2025 — present",
    location: "Lahore, Pakistan",
    summary:
      "Techanzy builds Implement AI, a commercial AI Operating System used by clients in the UK, Ireland and UAE. I own three of its production applications: AIOS Core, AIOS Portal and the Admin App, each built and maintained as the sole developer, in a PR workflow where every change goes through team lead review.",
  },
];

export const skills: SkillBlock[] = [
  {
    title: "backend",
    body: "I build production APIs with FastAPI, Django and DRF on PostgreSQL, structured around DTOs and use cases so the business logic stays testable. Celery, Redis and cron jobs handle the work that shouldn't block a request, and Docker plus GitHub Actions get it deployed.",
  },
  {
    title: "ai systems",
    body: "MCP servers, RAG pipelines and agent workflows with LangChain and CrewAI. That includes a workflow orchestrator that sequences agent steps, survives a dropped connection, and pauses for human review before it continues.",
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
    // Leads the list: for a recruiter it is the one line that decides
    // whether the rest is worth reading.
    icon: "dot",
    verb: "Open to",
    text: "new opportunities",
  },
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
    // "Serving clients across the UK, Ireland and UAE" read as though
    // they were his own clients. They are Techanzy's; his role is
    // building the platform those clients use.
    icon: "users",
    verb: "Working at",
    text: "Techanzy, on a platform used across the UK, Ireland and UAE",
  },
  {
    icon: "seedling",
    verb: "Graduated",
    text: "BS Software Engineering, Superior University, 2026",
  },
];

export const funFact =
  "I built and now maintain three production apps at once (Core, Portal and Admin) as the only developer on each 🚀";

export const readme: string[] = [
  "I'm a Software Engineer who likes the part of the job that has to keep working when nobody is watching. The run that resumes after a dropped connection, the permission check that holds at every layer, the webhook that reconciles whether or not the user stayed on the page. Most of what I've shipped lives there.",
  "At Techanzy I work on Implement AI, a commercial AI Operating System with clients in the UK, Ireland and UAE. I own three production applications on it: AIOS Core for internal analytics and operations, AIOS Portal for no-code agent workflows, and the Admin App for payments, security and access control. Each was built as the sole developer, in a PR workflow where every change goes through team lead review.",
  "The through-line is ownership. I'd rather hold a system end to end, from architecture and implementation through deployment and the maintenance months later, than hand it off at the boundary. Clean architecture, DTOs and use cases aren't ceremony to me. They're what makes that ownership survivable.",
];
