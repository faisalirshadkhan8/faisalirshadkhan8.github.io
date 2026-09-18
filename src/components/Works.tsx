import { ProjectCard } from "./ProjectCard";
import { SvgButton } from "./SvgButton";
import { projectsByCategory } from "@/content/projects";
import { profile } from "@/content/profile";
import { asset } from "@/content/site";

export function Works() {
  const groups = projectsByCategory();

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

      {groups.map((group) => (
        <div key={group.category}>
          <h3
            className="mt-10 text-2xl font-bold capitalize"
            style={{ color: "var(--text-strong)" }}
          >
            {group.category}
          </h3>
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            {group.items.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      ))}

      {profile.resumeHref && (
        <div className="mt-10 flex max-w-xl flex-col items-center justify-between px-5 py-5 shadow-2xl md:h-40 md:flex-row md:px-10 md:py-0">
          <p className="mb-3 text-lg font-bold md:mb-0">
            I cook with these ingredients 👉
          </p>
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
