import { Icon } from "./Sprite";
import { impact, statusLines, funFact, readme } from "@/content/profile";

/**
 * Numbers, current status and the bio.
 *
 * This used to be a grey card inset inside the white shell, narrower
 * than the sections above and below it, with four unrelated things
 * stacked in one container and the three figures cramped into a left
 * column. It now runs the full width like every other section: the
 * numbers get equal horizontal space as a band, and a rule separates
 * them from the bio rather than a box enclosing everything.
 */
export function Readme() {
  return (
    <section className="mt-16 md:mt-28">
      <div className="stats">
        {impact.map((stat) => (
          <div key={stat.label} className="stat">
            <p className="stat__n">
              {stat.value}
              {stat.suffix && <span>{stat.suffix}</span>}
            </p>
            <p className="stat__label">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bio">
        <div className="bio__main">
          <h2 className="section-kicker">README</h2>
          <div className="kj-border" />
          {readme.map((para, i) => (
            <p key={i} className="bio__para">
              {para}
            </p>
          ))}
          <p className="bio__fun">
            <span className="bio__fun-label">Fun fact</span>
            {funFact}
          </p>
        </div>

        <aside className="bio__side">
          <h3 className="section-kicker">Currently</h3>
          <div className="kj-border" />
          <dl className="status">
            {statusLines.map((line) => (
              <div key={line.text} className="status__row">
                <dt className="status__verb">
                  <Icon id={line.icon} className="status__icon" />
                  {line.verb}
                </dt>
                <dd className="status__text">
                  {line.href ? (
                    <a
                      href={line.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="status__link"
                    >
                      {line.text}
                    </a>
                  ) : (
                    line.text
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
}
