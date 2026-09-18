import type { Project } from "./types";

/**
 * The AIOS applications are internal to a commercial product, so they get
 * gradient tiles rather than invented screenshots. The personal projects
 * point at their public repositories.
 */
export const projects: Project[] = [
  {
    slug: "aios-core",
    name: "AIOS Core",
    stack: ["FastAPI", "PostgreSQL", "Azure Blob"],
    summary:
      "Internal analytics and operations platform for the whole Implement AI team, built from the ground up as the sole developer.",
    category: "Implement AI",
    period: "2025 — present",
    tag: "Commercial product · internal",
    visual: { kind: "gradient", from: "#4a6fb5", to: "#2f4a7d" },
    order: 1,
    detail: {
      problem:
        "Implement AI runs a commercial AI Operating System for clients across the UK, Ireland and UAE. The team operating it had no single place to see revenue, billing, agent activity or credit usage, and no structured way to manage documents, tasks or who could see what.",
      approach:
        "I built AIOS Core from the ground up as the sole developer, delivering 6 of 8 planned features. The design leans on clean architecture, using DTOs and use cases so the operational logic stays testable as the surface grows. Every change went through team lead review in a strict PR-based workflow.",
      outcome:
        "The platform is now used by the entire Implement AI team for analytics and day-to-day operations. The MCP server lets the AIOS Command team query live client records conversationally rather than through a dashboard.",
      highlights: [
        "Designed and shipped an authorized, read-only MCP (Model Context Protocol) server exposing clients, use cases, teams, tasks and analytics to AI agents through a single list/view tool, with no create, update or delete path, bearer-token auth, and no credentials in source control",
        "Registered it as a Custom App to MCP Server integration in AIOS and validated it end to end with Claude as the test client",
        "Built the Knowledgebase module: predefined and user-defined folders with subfolders, folder-level role-based permissions, document CRUD, version history with rollback, tags, keyword search filtered by folder/tag/author/date, archive-restore, and bulk actions with partial-failure handling",
        "Standardised document storage on Azure Blob Storage across Core and Portal, keeping file bytes in Azure with URLs and metadata tracked in the database",
        "Integrated Grafana APIs and scheduled cron jobs to sync client revenue, billing metrics, agent activity and credit usage",
        "Built a JIRA-style task management system, attendance management, RBAC across 6 user roles, and a RAG-powered support chatbot",
      ],
    },
  },
  {
    slug: "aios-portal",
    name: "AIOS Portal",
    stack: ["FastAPI", "Next.js", "CrewAI"],
    summary:
      "A no-code workflow builder that lets non-technical users chain AI agents into ordered, resumable runs with human review checkpoints.",
    category: "Implement AI",
    period: "2025 — present",
    tag: "Commercial product · internal",
    visual: { kind: "gradient", from: "#3f7a6d", to: "#26514a" },
    order: 2,
    detail: {
      problem:
        "AIOS Commands is a ChatGPT-style agent product, but configuring and chaining those agents required technical knowledge. Non-technical users had no way to compose agents into a repeatable process, and a long-running agent chain that lost its connection lost its work.",
      approach:
        "I built AIOS Portal single-handedly as an n8n-style workflow builder, where command agents become ordered steps and each step's input is typed manually, drawn from an earlier step's output, or a mix of both. Underneath it sits an orchestrator that treats a run as persistent state rather than an in-flight request.",
      outcome:
        "Non-technical users can now configure and run multi-agent workflows themselves, with runs that survive a page refresh and pause for human judgement where it matters.",
      highlights: [
        "Built the workflow orchestrator: it owns workflow definitions, sequences steps per run, resolves each step's input, invokes the agent runtime, and tracks run and step-run status across pending, running, waiting, done and failed",
        "Implemented Human-in-the-Loop checkpoints that pause a run, surface prior output for review, and resume on submit",
        "Persisted every step's text and file artifacts to an Azure-backed artifact store",
        "Built a persistent execution engine with live per-step output streaming that survives page refresh, tab close or lost connection",
        "Added an analytics dashboard tracking agent runs by type and credit usage",
      ],
    },
  },
  {
    slug: "aios-admin",
    name: "AIOS Admin App",
    stack: ["FastAPI", "Stripe", "SendGrid"],
    summary:
      "Payments, security and access control for the platform: Stripe checkout and invoicing, webhook-driven confirmation, and a partner portal.",
    category: "Implement AI",
    period: "2025 — present",
    tag: "Commercial product · internal",
    visual: { kind: "gradient", from: "#ab5838", to: "#743722" },
    order: 3,
    detail: {
      problem:
        "A commercial platform needs billing that reconciles correctly whether or not the user stays on the page, authentication that holds up against automated abuse, and transactional email that actually reaches the inbox.",
      approach:
        "I owned and maintained the production Admin App while building Core and Portal in parallel. Payment confirmation is webhook-driven rather than redirect-driven, so a closed tab never leaves an order in limbo.",
      outcome:
        "Payments, access control and partner onboarding run in production against real clients, alongside the AI sales and support agents configured on top.",
      highlights: [
        "Implemented access/refresh token authentication with Cloudflare Turnstile",
        "Built Stripe Checkout and Invoice payments with webhook-driven confirmation",
        "Configured SendGrid transactional email with SPF, DKIM and domain authentication",
        "Built the Partner Portal for introducer partners",
        "Configured AI sales and support agents using CrewAI, LangChain, VAPI and ElevenLabs",
        "Built the reusable Command Team Blueprint feature and JWT-based read-only analytics sharing links",
      ],
    },
  },
  {
    slug: "synq",
    name: "synQ",
    stack: ["Django REST", "Celery", "Groq"],
    summary:
      "A production-grade job application tracker with async AI features, 2FA, and 143+ automated tests behind CI/CD.",
    category: "Personal Projects",
    period: "2025",
    href: "https://github.com/faisalirshadkhan8",
    visual: { kind: "gradient", from: "#5b5bd6", to: "#3a3a96" },
    order: 4,
    detail: {
      problem:
        "Tracking job applications across spreadsheets and inboxes loses the thread quickly. The genuinely useful parts, like tailoring a cover letter or prepping for an interview, are exactly the parts that take longest.",
      approach:
        "I built a modular Django backend split into apps for applications, interviews, analytics, notifications, exports and webhooks, with the AI work pushed onto Celery so a slow LLM call never blocks a request.",
      outcome:
        "A production-grade backend with real authentication hardening, async AI features, and a test suite substantial enough to refactor against.",
      highlights: [
        "JWT authentication, email verification, password reset and TOTP-based two-factor authentication",
        "Async AI features for cover letter generation, job matching and interview preparation, using Celery, Redis and Groq LLMs",
        "Containerized with Docker, with CI/CD through GitHub Actions",
        "143+ automated tests with pytest and pytest-django, documented through Swagger/OpenAPI",
      ],
    },
  },
  {
    slug: "maternal-mental-health",
    name: "Maternal Mental Health Monitoring",
    stack: ["Flask", "Whisper AI", "PostgreSQL"],
    summary:
      "Final year project: ML and NLP for depression screening and suicide risk detection in Roman Urdu, with speech-to-text for low-literacy users.",
    category: "Personal Projects",
    period: "2025",
    visual: { kind: "gradient", from: "#a04a7a", to: "#6b2f52" },
    order: 5,
    detail: {
      problem:
        "PHQ-9 depression screening assumes a patient who can read, write and self-report in a language the tool supports. For low-literacy Roman Urdu speakers, that assumption excludes the people most in need of screening.",
      approach:
        "I built ML models for PHQ-9 scoring alongside an NLP pipeline for suicide risk detection in Roman Urdu text, then integrated Whisper AI speech-to-text so the assessment could be spoken rather than typed. I developed the Flask backend in a team of three.",
      outcome:
        "85% accuracy on the PHQ-9 dataset, with the speech pathway making the tool usable by people the text-only version would have excluded. Awarded Grade A (85%) in FYP-1 evaluation.",
      highlights: [
        "ML models using Logistic Regression, Random Forest and SMOTE, reaching 85% accuracy on the PHQ-9 dataset",
        "NLP pipeline for suicide risk detection in Roman Urdu text",
        "Whisper AI speech-to-text integration for low-literacy accessibility",
      ],
    },
  },
  {
    slug: "study-planner-rag",
    name: "Study Planner with RAG",
    stack: ["Flask", "FAISS", "Ollama"],
    summary:
      "A retrieval-augmented generation pipeline over PDF, DOCX and TXT documents, with context validation to reduce hallucinations.",
    category: "Personal Projects",
    period: "Oct — Dec 2025",
    visual: { kind: "gradient", from: "#3d8ebd", to: "#26566f" },
    order: 6,
    detail: {
      problem:
        "A study assistant that answers confidently from outside your own material is worse than no assistant at all, because you cannot tell which half to trust.",
      approach:
        "I built a RAG pipeline over the user's own PDF, DOCX and TXT documents with FAISS vector search, then added a context validation step so answers that are not grounded in the retrieved passages get caught rather than returned.",
      outcome:
        "85% retrieval accuracy, with hallucinations materially reduced by validating answers against retrieved context before returning them.",
      highlights: [
        "FAISS vector search over multi-format document ingestion",
        "Context validation layer to reduce ungrounded answers",
        "Local inference through Ollama",
      ],
    },
  },
  {
    slug: "ecommerce-platform",
    name: "E-Commerce Platform",
    stack: ["Django REST", "PostgreSQL", "Python"],
    summary:
      "An e-commerce backend with 30+ REST APIs over a normalized schema, with inventory reservation and role-based permissions.",
    category: "Personal Projects",
    period: "Jun — Jul 2025",
    visual: { kind: "gradient", from: "#4f7a3f", to: "#2f4a26" },
    order: 7,
    detail: {
      problem:
        "Checkout is where an e-commerce schema gets tested. Two customers reaching the last item at the same time should not both succeed.",
      approach:
        "I built the backend around a normalized PostgreSQL schema with explicit inventory reservation, so stock is held at the point of checkout rather than assumed at the point of payment.",
      outcome:
        "30+ REST APIs covering products, orders, checkout and payments, with role-based permissions across the surface.",
      highlights: [
        "30+ REST APIs across products, orders, checkout and payments",
        "Normalized PostgreSQL schema with inventory reservation",
        "Role-based permissions",
      ],
    },
  },
];

/** Category order on the home page; unlisted categories follow, alphabetically. */
export const categoryOrder = ["Implement AI", "Personal Projects"];

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
