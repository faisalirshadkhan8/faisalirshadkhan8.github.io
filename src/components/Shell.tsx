import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "./Sprite";
import { SiteHeader } from "./SiteHeader";
import { profile } from "@/content/profile";
import { asset } from "@/content/site";

/**
 * The signature frame: a white card floating on warm paper, with a narrow
 * left rail carrying the wordmark and vertical socials.
 */
export function Shell({ children }: { children: ReactNode }) {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>

      <div style={{ background: "var(--surface-shell)" }} className="md:py-16">
        <div
          className="mx-auto max-w-6xl p-2 sm:rounded-lg md:p-8 md:shadow-2xl"
          style={{ background: "var(--surface-card)" }}
        >
          {/*
            One header instance, positioned differently by breakpoint:
            on mobile the wordmark shares its row (order-first), while
            from md the rail takes the left column and the nav the right.
          */}
          <div className="flex flex-col md:flex-row">
            <div className="flex shrink-0 items-start justify-between md:w-32 md:block">
              <Link href="/" className="mark" aria-label={profile.name}>
                {profile.initials}
                <span>.</span>
              </Link>
              <div className="mt-64 hidden md:block">
                {profile.socials.map((s) => (
                  <a
                    key={s.kind}
                    href={s.href}
                    aria-label={s.label}
                    target={s.kind === "email" ? undefined : "_blank"}
                    rel={s.kind === "email" ? undefined : "noopener noreferrer"}
                    className="mb-5 block w-6 transition-colors hover:text-[var(--color-prime)]"
                  >
                    <Icon id={s.kind} className="text-2xl" />
                  </a>
                ))}
              </div>
            </div>

            <div className="min-w-0 md:flex-1">
              <SiteHeader />
              <main id="main">{children}</main>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </>
  );
}

function SiteFooter() {
  return (
    <div
      className="mx-auto max-w-6xl p-2 md:p-8"
      style={{ color: "var(--text-body)" }}
    >
      <footer className="mt-10 md:flex">
        <div className="mb-3 text-center text-xs uppercase md:mb-0 md:w-1/4 md:text-left">
          <Link href="/" className="mark" aria-label={profile.name}>
            {profile.initials}
            <span>.</span>
          </Link>
        </div>
        <div className="mb-3 text-center md:mb-0 md:w-2/4">
          <ul>
            <li className="inline-block text-xs uppercase md:mr-6">
              <Link href="/#works" className="f-link">
                works
              </Link>
            </li>
            {profile.resumeHref && (
              <li className="inline-block text-xs uppercase md:mr-6">
                <a href={asset(profile.resumeHref)} download className="f-link">
                  resume
                </a>
              </li>
            )}
            <li className="inline-block text-xs uppercase">
              <Link href="/#contact" className="f-link">
                contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="text-center text-xs uppercase md:w-1/4">
          <p className="px-2 py-1">
            © {new Date().getFullYear()} {profile.name}. All rights reserved
          </p>
        </div>
      </footer>

      <div className="color-bar">
        <div style={{ background: "var(--color-prime)" }} />
        <div style={{ background: "var(--color-gold)" }} />
        <div style={{ background: "var(--color-prime-light)" }} />
        <div style={{ background: "var(--color-secondary)" }} />
      </div>
    </div>
  );
}
