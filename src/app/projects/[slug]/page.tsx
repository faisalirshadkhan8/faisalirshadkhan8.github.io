import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Sprite";
import { projects, getProject } from "@/content/projects";
import { asset, absoluteUrl } from "@/content/site";

/** Every project route is emitted at build time — required by static export. */
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const url = absoluteUrl(`/projects/${project.slug}/`);
  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: project.name,
      description: project.summary,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: project.name,
      description: project.summary,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { detail, visual } = project;

  return (
    <article className="mt-10 max-w-3xl">
      <Link href="/#works" className="f-link text-sm">
        <Icon id="arrow-left" className="mr-1" />
        Back to works
      </Link>

      <header className="mt-8">
        <p className="text-sm tracking-[0.18em] uppercase" style={{ color: "var(--text-muted)" }}>
          {project.category}
        </p>
        <h1
          className="mt-2 text-4xl leading-none font-black"
          style={{ color: "var(--text-strong)" }}
        >
          {project.name}
        </h1>
        <div className="kj-border" />
        <p className="mt-6 text-lg">{project.summary}</p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {project.stack.map((item) => (
            <span
              key={item}
              className="rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase"
              style={{ background: "var(--surface-raised)", color: "var(--text-body)" }}
            >
              {item}
            </span>
          ))}
        </div>

        {project.href && (
          <p className="mt-6">
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold underline underline-offset-4"
            >
              Visit the live site
              <Icon id="arrow-up-right" className="ml-1" />
            </a>
            {project.tag && (
              <span className="ml-3 text-sm" style={{ color: "var(--text-muted)" }}>
                {project.tag}
              </span>
            )}
          </p>
        )}
      </header>

      {visual.kind !== "gradient" && (
        <figure
          className="mt-10 overflow-hidden rounded-lg"
          style={{ background: "var(--surface-diagram)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- static export, no optimizer */}
          <img src={asset(visual.src)} alt={visual.alt} className="w-full" />
        </figure>
      )}

      {detail && (
        <div className="mt-12 space-y-10">
          {detail.problem && <Section title="The problem" body={detail.problem} />}
          {detail.approach && <Section title="The approach" body={detail.approach} />}

          {detail.highlights?.length ? (
            <section>
              <h2 className="text-2xl font-bold" style={{ color: "var(--text-strong)" }}>
                What I built
              </h2>
              <div className="kj-border" />
              <ul className="mt-5 space-y-2">
                {detail.highlights.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: "var(--color-prime)" }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {detail.outcome && <Section title="The outcome" body={detail.outcome} />}
        </div>
      )}
    </article>
  );
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <section>
      <h2 className="text-2xl font-bold" style={{ color: "var(--text-strong)" }}>
        {title}
      </h2>
      <div className="kj-border" />
      <p className="mt-5">{body}</p>
    </section>
  );
}
