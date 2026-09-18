import Link from "next/link";
import type { Route } from "next";
import type { Project } from "@/content/types";

/**
 * An index row rather than a card.
 *
 * The grid this replaced gave seven projects identical tiles, so nothing
 * signalled which mattered; and each tile carried a paragraph of body
 * text floating in a large block of arbitrary colour, which is the look
 * that reads as generated. A row states the same facts in the order
 * someone actually scans them: number, name, what it is, what it's built
 * with.
 */
export function WorkRow({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <li className="work-row">
      <Link
        href={`/projects/${project.slug}` as Route}
        className="work-row__link"
        aria-label={`${project.name}, case study`}
      >
        <span className="work-row__num" aria-hidden="true">
          {String(index).padStart(2, "0")}
        </span>

        <span className="work-row__body">
          <span className="work-row__head">
            <h4 className="work-row__name">{project.name}</h4>
            {project.period && (
              <span className="work-row__period">{project.period}</span>
            )}
          </span>

          <span className="work-row__summary">{project.summary}</span>

          <span className="work-row__meta">
            <span className="work-row__stack">{project.stack.join(" · ")}</span>
            {project.tag && (
              <span className="work-row__tag">{project.tag}</span>
            )}
          </span>
        </span>

        <span className="work-row__arrow" aria-hidden="true">
          →
        </span>
      </Link>
    </li>
  );
}
