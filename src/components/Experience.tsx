import { experience } from "@/content/profile";

/**
 * Employment, stated plainly above the works index.
 *
 * Without it the three AIOS applications sat under a bare "Implement AI"
 * heading, which reads as though the product and its clients were his
 * own. They are his employer's; what is his is the engineering.
 */
export function Experience() {
  if (experience.length === 0) return null;

  return (
    <section id="experience" className="mt-16 md:mt-28">
      <h2 className="section-kicker">Experience</h2>
      <div className="kj-border" />

      <ul className="exp">
        {experience.map((job) => (
          <li key={`${job.company}-${job.period}`} className="exp__row">
            <div className="exp__head">
              <h3 className="exp__company">
                {job.href ? (
                  <a
                    href={job.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="exp__link"
                  >
                    {job.company}
                  </a>
                ) : (
                  job.company
                )}
              </h3>
              <span className="exp__period">{job.period}</span>
            </div>

            <p className="exp__role">
              {job.role}
              <span className="exp__dot" aria-hidden="true">
                ·
              </span>
              <span className="exp__location">{job.location}</span>
            </p>

            <p className="exp__summary">{job.summary}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
