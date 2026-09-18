"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Momentum scrolling.
 *
 * Native `scroll-behavior: smooth` only eases programmatic jumps — a
 * wheel tick still lands as a hard step. Lenis takes over the scroll
 * position and eases it toward the target each frame, which is the
 * weighted feel the CSS property cannot give.
 *
 * Two things it must not break:
 *   - `prefers-reduced-motion`, where hijacking the scroll is exactly
 *     what the user asked us not to do. There we do not start at all.
 *   - the skills scene, which is driven by `animation-timeline: view()`.
 *     That reads the real scroll position, so it stays in step as long
 *     as Lenis drives the document scroller rather than a faked wrapper.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const lenis = new Lenis({
      // ~1s to settle: enough weight to feel deliberate, not sluggish.
      duration: 1.05,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      // Touch devices already have native momentum; overriding it there
      // fights the platform and feels worse than leaving it alone.
      smoothWheel: true,
      touchMultiplier: 1,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Anchor links: let Lenis animate them so nav jumps share the same
    // easing as the wheel, and honour the CSS scroll-padding so a target
    // does not land under the header.
    const offset = -96;
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>(
        'a[href*="#"]',
      );
      if (!link) return;
      if (link.target === "_blank" || e.metaKey || e.ctrlKey || e.shiftKey) return;

      const url = new URL(link.href, window.location.href);
      if (url.pathname !== window.location.pathname || !url.hash) return;

      const target = document.querySelector(url.hash);
      if (!target) return;

      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset });
      history.pushState(null, "", url.hash);
    };

    document.addEventListener("click", onClick);

    // If the user switches on reduced motion mid-session, stand down.
    const onPreferenceChange = (e: MediaQueryListEvent) => {
      if (e.matches) lenis.destroy();
    };
    reduced.addEventListener("change", onPreferenceChange);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onClick);
      reduced.removeEventListener("change", onPreferenceChange);
      lenis.destroy();
    };
  }, []);

  return null;
}
