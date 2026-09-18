"use client";

import { useEffect, useRef } from "react";
import { SvgButton } from "./SvgButton";
import { asset } from "@/content/site";
import { skills } from "@/content/profile";

const LAYERS = [1, 2, 3, 4, 5, 6, 7] as const;

/**
 * The layered desk scene. Two tiers of motion:
 *
 *   - Browsers with `animation-timeline: view()` scrub the assembly
 *     against scroll, pinned for 250vh (the source pinned 400vh).
 *   - Everything else — and every narrow screen — reveals the same
 *     layers on entry via IntersectionObserver. The source hid the
 *     illustration entirely below 1024px, so mobile saw a bare panel.
 */
export function Skills() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Where scroll-linked animation is available the CSS drives it and the
    // observer would only fight it.
    const scrollLinked =
      CSS.supports("animation-timeline: view()") &&
      window.matchMedia("(min-width: 1024px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (scrollLinked) return;

    const targets = [sceneRef.current, panelRef.current].filter(
      (el): el is HTMLDivElement => el !== null,
    );
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.2 },
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="skills-pin">
      <section id="skills" className="skills-sticky mt-16 md:mt-24">
        <div className="w-full">
          <h2
            className="text-3xl leading-none font-bold capitalize md:text-4xl"
            style={{ color: "var(--text-strong)" }}
          >
            my top skills
          </h2>
          <p className="mt-2 text-lg capitalize">what i do</p>
          <div className="kj-border" />

          <div
            ref={panelRef}
            className="skills-panel mt-10 grid grid-cols-1 rounded-lg border-2 lg:grid-cols-2"
            style={{
              background: "var(--surface-raised)",
              borderColor: "var(--surface-raised)",
            }}
          >
            <div className="p-5 text-center md:mx-8">
              {skills.map((block, i) => (
                <div
                  key={block.title}
                  className={`skill-reveal skill-reveal--${i + 1}`}
                  style={{ "--d": `${0.1 + i * 0.15}s` } as React.CSSProperties}
                >
                  <h3
                    className="mb-3 text-lg font-black uppercase"
                    style={{ color: "var(--text-strong)" }}
                  >
                    {block.title}
                  </h3>
                  <p className="mb-5">{block.body}</p>
                </div>
              ))}

              <div
                className={`skill-reveal skill-reveal--${skills.length + 1} mt-8 flex justify-center`}
                style={{ "--d": `${0.1 + skills.length * 0.15}s` } as React.CSSProperties}
              >
                <SvgButton
                  href="/#works"
                  label="SEE MY WORKS"
                  ariaLabel="See my works"
                />
              </div>
            </div>

            <div ref={sceneRef} className="scene hidden lg:block" aria-hidden="true">
              {LAYERS.map((n) => (
                // eslint-disable-next-line @next/next/no-img-element -- static export, no optimizer
                <img
                  key={n}
                  className={`scene__img scene__img--${n}`}
                  src={asset(
                    `/assets/images/illustrations/illustration-0${n}.svg`,
                  )}
                  alt=""
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
