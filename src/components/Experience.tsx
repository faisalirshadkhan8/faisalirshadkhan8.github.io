import { experience } from "@/content/profile";

/**
 * Employment as a timeline.
 *
 * Roles are nested under their employer rather than listed flat, so two
 * titles at the same company read as a promotion rather than as two
 * separate jobs. The rail and its markers are decorative, so they are
 * drawn in CSS and hidden from assistive tech; the heading structure
 * alone carries the meaning.
 */
export function Experience() {
  if (experience.length === 0) return null;

  return (
    <section id="experience" className="mt-16 md:mt-28">
      <h2 className="section-kicker">Experience</h2>
      <div className="kj-border" />

      <ol className="tl">
        {experience.map((job) => (
          <li key={job.company} className="tl__job">
            <div className="tl__head">
              <h3 className="tl__company">
                {job.href ? (
                  <a
                    href={job.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tl__link"
                  >
                    {job.company}
                  </a>
                ) : (
                  job.company
                )}
              </h3>
              <p className="tl__location">{job.location}</p>
              {job.about && <p className="tl__about">{job.about}</p>}
            </div>

            <ol className="tl__roles">
              {job.roles.map((role) => (
                <li key={role.title} className="tl__role">
                  <p className="tl__period">{role.period}</p>
                  <h4 className="tl__title">{role.title}</h4>
                  <p className="tl__summary">{role.summary}</p>

                  {role.highlights?.length ? (
                    <ul className="tl__points">
                      {role.highlights.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </section>
  );
}
