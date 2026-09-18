import Link from "next/link";
import type { Project } from "@/content/types";
import { asset } from "@/content/site";

/**
 * Card art comes in three forms: a gradient tile (honest for work behind
 * a login), an architecture diagram, or a screenshot. The title always
 * sits in its own bar below, never painted over the art.
 */
function Media({ project }: { project: Project }) {
  const { visual, tag, summary } = project;

  if (visual.kind === "gradient") {
    return (
      <div
        className="proj__media"
        style={{
          background: `linear-gradient(140deg, ${visual.from}, ${visual.to})`,
        }}
      >
        {tag && <span className="proj__tag">{tag}</span>}
        <p className="proj__blurb">{summary}</p>
      </div>
    );
  }

  return (
    <div className="proj__media proj__media--diagram">
      {/* eslint-disable-next-line @next/next/no-img-element -- static export, no optimizer */}
      <img src={asset(visual.src)} alt={visual.alt} loading="lazy" />
    </div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const inner = (
    <>
      <Media project={project} />
      <div className="proj__bar">
        <h3 className="proj__name">{project.name}</h3>
        <p className="proj__stack">{project.stack.join(" · ")}</p>
      </div>
    </>
  );

  // Every project has a detail route, so the card always links inward.
  // The live URL is surfaced on the detail page instead of competing
  // with it here.
  return (
    <Link
      className="proj"
      href={`/projects/${project.slug}`}
      aria-label={`${project.name}, case study`}
    >
      {inner}
    </Link>
  );
}
