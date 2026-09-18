"use client";

import Link from "next/link";
import type { Route } from "next";
import { useEffect, useState } from "react";
import { Icon } from "./Sprite";
import { BookButton } from "./BookButton";
import { profile } from "@/content/profile";
import { asset } from "@/content/site";

/**
 * A floating dock, fixed to the bottom of the viewport, replacing the
 * top nav bar.
 *
 * It highlights whichever section is currently in view. That is done
 * with IntersectionObserver rather than scroll maths: with Lenis driving
 * the scroll position, a scroll handler would run on every eased frame,
 * and the observer reports the same thing for free.
 */
interface DockItem {
  id: string;
  label: string;
  icon: string;
  href: Route;
}

const ITEMS: DockItem[] = [
  { id: "main", label: "Home", icon: "home", href: "/#main" },
  { id: "skills", label: "Skills", icon: "layers", href: "/#skills" },
  { id: "experience", label: "Experience", icon: "briefcase", href: "/#experience" },
  { id: "works", label: "Works", icon: "file", href: "/#works" },
  { id: "contact", label: "Contact", icon: "envelope", href: "/#contact" },
];

export function Dock() {
  const [active, setActive] = useState<string>("main");

  useEffect(() => {
    const sections = ITEMS.map((i) => document.getElementById(i.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (!sections.length) return;

    // A band across the upper middle of the viewport: a section counts as
    // current once its top passes it, which matches where the eye is.
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <nav className="dock" aria-label="Sections">
      <ul className="dock__list">
        {ITEMS.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href}
              className="dock__item"
              aria-label={item.label}
              aria-current={active === item.id ? "true" : undefined}
              data-active={active === item.id ? "" : undefined}
            >
              <Icon id={item.icon} className="dock__icon" />
              <span className="dock__tip" aria-hidden="true">
                {item.label}
              </span>
            </Link>
          </li>
        ))}

        {profile.resumeHref && (
          <li>
            <a
              className="dock__item"
              href={asset(profile.resumeHref)}
              download
              aria-label="Download resume"
            >
              <Icon id="user-tie" className="dock__icon" />
              <span className="dock__tip" aria-hidden="true">
                Resume
              </span>
            </a>
          </li>
        )}

        <li className="dock__sep" aria-hidden="true" />

        <li>
          <BookButton />
        </li>
      </ul>
    </nav>
  );
}
