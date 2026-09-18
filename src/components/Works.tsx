import { WorkRow } from "./WorkRow";
import { SvgButton } from "./SvgButton";
import { projectsByCategory } from "@/content/projects";
import { profile } from "@/content/profile";
import { asset } from "@/content/site";

export function Works() {
  const groups = projectsByCategory();

  // Numbering runs continuously across groups, so the list reads as one
  // index rather than restarting per section. Computed up front: a
  // counter incremented while rendering mutates during render.
  const numbered = groups.reduce<
    { category: string; items: { project: (typeof groups)[number]["items"][number]; n: number }[] }[]
  >((acc, group) => {
    const offset = acc.reduce((sum, g) => sum + g.items.length, 0);
    acc.push({
      category: group.category,
      items: group.items.map((project, i) => ({ project, n: offset + i + 1 })),
    });
    return acc;
  }, []);

  return (
    <section id="works" className="mt-12 md:mt-32">
      <h2
        className="text-3xl leading-none font-bold capitalize md:text-4xl"
        style={{ color: "var(--text-strong)" }}
      >
        My Works
      </h2>
      <p className="mt-2 text-lg">A few of my past and present projects</p>
      <div className="kj-border" />

      {numbered.map((group) => (
        <div key={group.category} className="mt-12">
          <h3 className="work-group">{group.category}</h3>
          <ul className="work-list">
            {group.items.map(({ project, n }) => (
              <WorkRow key={project.slug} project={project} index={n} />
            ))}
          </ul>
        </div>
      ))}

      {profile.resumeHref && (
        <div className="mt-14 flex max-w-xl flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-lg font-bold">I cook with these ingredients 👉</p>
          <SvgButton
            href={asset(profile.resumeHref)}
            label="MY RESUME"
            download
            ariaLabel="Download my resume"
          />
        </div>
      )}
    </section>
  );
}
