import { ContactDisc } from "./ContactDisc";
import { Medallion } from "./Medallion";
import { profile } from "@/content/profile";

export function Hero() {
  let index = 0;

  return (
    <header className="hero mt-8 md:mt-12">
      <div className="hero__copy">
        <div className="text-center md:text-left">
          <div
            className="callout pop"
            style={{ "--d": "0.15s" } as React.CSSProperties}
          >
            It&rsquo;s me
          </div>

          <h1
            className="hero__name"
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
                      style={
                        { "--d": `${delay.toFixed(2)}s` } as React.CSSProperties
                      }
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
          className="rise hero__role"
          style={{ "--d": "0.75s" } as React.CSSProperties}
        >
          {profile.role}
          <span className="hero__dot" aria-hidden="true">
            ·
          </span>
          <span className="hero__location">{profile.location}</span>
        </p>

        <p
          className="rise hero__tagline"
          style={{ "--d": "0.9s" } as React.CSSProperties}
        >
          {profile.tagline}
        </p>

        {profile.heroStack.length > 0 && (
          <ul
            className="rise hero__stack"
            style={{ "--d": "1s" } as React.CSSProperties}
            aria-label="Core stack"
          >
            {profile.heroStack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}

        <div
          className="rise hero__cta"
          style={{ "--d": "1.1s" } as React.CSSProperties}
        >
          <ContactDisc />
        </div>
      </div>

      <div className="hero__figure">
        <Medallion />
      </div>
    </header>
  );
}
