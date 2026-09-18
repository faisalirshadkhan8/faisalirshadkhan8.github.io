import { Icon } from "./Sprite";
import { impact, statusLines, funFact, readme } from "@/content/profile";

/**
 * The intro card: hard numbers on the left, current status and bio on
 * the right. Figures carry this space better than a second copy of the
 * hero artwork.
 */
export function Readme() {
  return (
    <div className="m-auto mt-12 px-2 py-4 md:mt-32 md:w-3/4">
      <div
        className="rounded-lg border-2 shadow-2xl"
        style={{
          background: "var(--surface-raised)",
          borderColor: "var(--surface-raised)",
        }}
      >
        <div className="grid grid-cols-1 gap-5 p-4 md:grid-cols-2">
          <div className="pt-2">
            <p
              className="mb-4 text-xs font-bold tracking-[0.18em] uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              Impact
            </p>
            <ul>
              {impact.map((stat) => (
                <li key={stat.label} className="impact__row">
                  <span className="impact__n">
                    {stat.value}
                    {stat.suffix && <span>{stat.suffix}</span>}
                  </span>
                  <span className="text-sm leading-relaxed">{stat.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-10">
            {statusLines.map((line) => (
              <div key={line.text} className="mt-2">
                <Icon id={line.icon} className="inline-block text-lg" />
                <p className="ml-1 inline-block">
                  {line.verb}{" "}
                  {line.href ? (
                    <a
                      href={line.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold underline"
                    >
                      {line.text}
                    </a>
                  ) : (
                    <span className="font-bold">{line.text}</span>
                  )}
                </p>
              </div>
            ))}
            <p className="mt-4">
              <span className="font-bold">Fun fact:</span> {funFact}
            </p>
          </div>
        </div>

        <div className="p-4">
          <div className="mt-10">
            <div className="mb-5 text-lg">
              <span className="font-medium uppercase">README</span>
              <div className="kj-border" />
            </div>
            {readme.map((para, i) => (
              <p key={i} className={i > 0 ? "mt-3" : undefined}>
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
