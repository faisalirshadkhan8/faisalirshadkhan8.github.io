import { profile } from "@/content/profile";
import { asset } from "@/content/site";

/**
 * Letter-by-letter name reveal, speech bubble, and the circular
 * "let's talk" disc. The source ran this behind a 4s boot spinner and
 * finished around 6.6s; the same beats here settle by ~1.3s.
 */
export function Hero() {
  // Each letter gets its own delay, continuing across line breaks.
  let index = 0;

  return (
    <header className="mt-10 md:flex md:items-center">
      <div className="md:flex-1">
        <div className="text-center md:text-left">
          <div className="callout pop" style={{ "--d": "0.15s" } as React.CSSProperties}>
            It&rsquo;s me
          </div>

          <h1
            className="mb-4 text-5xl leading-none font-black"
            aria-label={profile.name}
            style={{ color: "var(--text-strong)" }}
          >
            {profile.nameLines.map((line, li) => (
              <span key={li} className="block">
                {Array.from(line).map((char, ci) => {
                  const delay = 0.3 + index * 0.04;
                  index += 1;
                  return (
                    <span
                      key={ci}
                      className="letter"
                      aria-hidden="true"
                      style={{ "--d": `${delay.toFixed(2)}s` } as React.CSSProperties}
                    >
                      {char === " " ? " " : char}
                    </span>
                  );
                })}
              </span>
            ))}
          </h1>
        </div>

        <p
          className="rise px-5 text-center font-bold uppercase md:px-0 md:text-left"
          style={{ "--d": "0.75s" } as React.CSSProperties}
        >
          {profile.role}
        </p>

        <p
          className="rise mt-10 px-5 text-center text-sm md:w-64 md:px-0 md:text-left"
          style={{ "--d": "0.9s" } as React.CSSProperties}
        >
          {profile.tagline}
        </p>

        <div
          className="rise mt-10 flex justify-center md:justify-start"
          style={{ "--d": "1.05s" } as React.CSSProperties}
        >
          <div className="talk-wrapper md:ml-12">
            <a href={`mailto:${profile.email}`} aria-label={`Email ${profile.name}`}>
              <div className="talk">
                <span className="talk__text">
                  <span>let&rsquo;s</span>
                  <span className="talk__l2">talk</span>
                </span>
              </div>
            </a>
            <div className="talk-pulse" aria-hidden="true" />
          </div>
        </div>
      </div>

      <div className="mt-10 md:flex-1">
        <figure className="hero-figure">
          {profile.portrait ? (
            // eslint-disable-next-line @next/next/no-img-element -- static export, no optimizer
            <img
              src={asset(profile.portrait)}
              alt={`Portrait of ${profile.name}`}
              width={760}
              height={760}
              fetchPriority="high"
              decoding="async"
            />
          ) : (
            <span className="hero-initials" aria-hidden="true">
              {profile.initials.toUpperCase()}
            </span>
          )}
        </figure>
      </div>
    </header>
  );
}
