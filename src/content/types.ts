/**
 * Every fact the site renders is typed here and supplied from the files
 * beside this one. Components read from content; they never hardcode a
 * name, a link or a number. Changing a detail is a one-line edit in
 * `profile.ts` / `projects.ts`, never a hunt through JSX.
 */

export type SocialKind = "github" | "linkedin" | "email" | "x" | "website";

export interface SocialLink {
  kind: SocialKind;
  /** Shown as the accessible label, e.g. "GitHub". */
  label: string;
  /** Full URL. For email use a mailto: URL. */
  href: string;
}

/**
 * One reason someone might get in touch. Each becomes a chip that opens
 * the visitor's mail client with the subject and a starter body already
 * written, so nobody faces a blank compose window.
 */
export interface ContactReason {
  /** Chip text, e.g. "Hiring". */
  label: string;
  /** Email subject line. */
  subject: string;
  /**
   * Starter body. Written as the visitor, not as you: they only fill in
   * the blanks. Use 
 for line breaks.
   */
  body: string;
}

export interface Profile {
  /** Full name, e.g. "Ada Lovelace". */
  name: string;
  /**
   * The name broken into the lines the hero animates, one array entry per
   * visual line. ["Ada", "Lovelace"] renders two stacked lines of
   * letter-by-letter reveal.
   */
  nameLines: string[];
  /** Two-letter wordmark in the left rail and footer, e.g. "al". */
  initials: string;
  /** Uppercase line under the name, e.g. "Software Engineer". */
  role: string;
  /** Short paragraph beside the hero. One or two sentences. */
  tagline: string;
  location: string;
  email: string;
  /**
   * The stack shown as a meta line in the hero. Keep it to the handful
   * you actually want to be hired for, not everything you have touched.
   */
  heroStack: string[];
  /**
   * One short proof point beside the hero's call to action, e.g. a count
   * of shipped work. Null to omit it.
   */
  heroProof: string | null;
  /** Reasons offered when the hero's contact disc is opened. */
  contactReasons: ContactReason[];
  /** Path to the résumé within /public, or null to hide résumé links. */
  resumeHref: string | null;
  /** Square portrait within /public, or null to render an initials medallion. */
  portrait: string | null;
  socials: SocialLink[];
}

/**
 * One employment entry. Its purpose is to make the working relationship
 * explicit: the AIOS applications are work done at an employer, not
 * products of one's own, and a portfolio that does not say so invites
 * the wrong reading.
 */
export interface Job {
  company: string;
  /** Link to the employer or the product, if there is a public one. */
  href?: string;
  role: string;
  /** e.g. "Feb 2025 — present". */
  period: string;
  location: string;
  /** One or two sentences: what the company does, and what you own. */
  summary: string;
}

export interface SkillBlock {
  /** e.g. "backend" — rendered uppercase. */
  title: string;
  body: string;
}

export interface ImpactStat {
  /** The large numeral, e.g. "90". */
  value: string;
  /** Small suffix rendered beside it, e.g. "%" or "+". */
  suffix?: string;
  label: string;
}

export interface StatusLine {
  /** Icon id from the sprite, e.g. "microscope". */
  icon: string;
  /** Leading verb, e.g. "Building". */
  verb: string;
  text: string;
  href?: string;
}

export type ProjectVisual =
  | { kind: "diagram"; src: string; alt: string }
  | { kind: "image"; src: string; alt: string }
  | { kind: "gradient"; from: string; to: string };

export interface Project {
  /** URL segment: /projects/<slug>/ */
  slug: string;
  name: string;
  /** Up to three items, joined with · on the card. */
  stack: string[];
  /** One or two sentences shown on the card. */
  summary: string;
  /** Grouping heading on the home page, e.g. "Web Applications". */
  category: string;
  /** Live URL, if the work is publicly reachable. */
  href?: string;
  /** Small badge on the card, e.g. "Client work · access restricted". */
  tag?: string;
  /** Right-aligned on the works row, e.g. "2025" or "2025 — present". */
  period?: string;
  visual: ProjectVisual;
  /** Long-form body for /projects/<slug>/. Markdown-ish plain paragraphs. */
  detail?: {
    problem?: string;
    approach?: string;
    outcome?: string;
    /** Bullet list of specifics: what you actually built. */
    highlights?: string[];
  };
  /** Controls ordering; lower sorts first. */
  order?: number;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  /** ISO date, e.g. "2026-09-18". */
  date: string;
  tags: string[];
  /** Set false to keep a post out of the build. */
  published: boolean;
  /** Body as an array of paragraphs / headings. */
  body: string;
}
