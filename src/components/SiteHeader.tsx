"use client";

import Link from "next/link";
import type { Route } from "next";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./Sprite";
import { ThemeToggle } from "./ThemeToggle";
import { profile } from "@/content/profile";
import { asset } from "@/content/site";

/**
 * Internal destinations are typed routes so a bad link fails the build;
 * the résumé is a plain file URL and skips client routing.
 */
type NavItem =
  | { label: string; icon: string; plain?: false; href: Route }
  | { label: string; icon: string; plain: true; href: string; download?: boolean };

function navItems(): NavItem[] {
  const items: NavItem[] = [
    { label: "works", href: "/#works", icon: "file" },
  ];
  if (profile.resumeHref) {
    items.push({
      label: "resume",
      href: asset(profile.resumeHref),
      icon: "user-tie",
      plain: true,
      download: true,
    });
  }
  items.push({ label: "contact", href: "/#contact", icon: "envelope" });
  return items;
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const items = navItems();

  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Captured now: by cleanup time the ref may already point elsewhere.
    const burger = burgerRef.current;

    const panel = drawerRef.current;
    const focusables = () =>
      Array.from(
        panel?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );

    focusables()[0]?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;

      const list = focusables();
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previous;
      burger?.focus();
    };
  }, [open]);

  return (
    <nav aria-label="Primary" className="relative">
      <div className="hidden md:flex md:items-center">
        <div className="flex-1 text-sm">
          <a href={`mailto:${profile.email}`} className="f-link font-bold">
            <Icon id="envelope" className="mr-1 text-lg" />
            {profile.email}
          </a>
          <ThemeToggle className="ml-8 align-middle" />
        </div>
        <div className="flex items-center">
          {items.map((item) =>
            item.plain ? (
              <a
                key={item.label}
                href={item.href}
                download={item.download}
                className="f-link capitalize"
              >
                <Icon id={item.icon} className="mr-1 text-lg" />
                {item.label}
              </a>
            ) : (
              <Link key={item.label} href={item.href} className="f-link capitalize">
                <Icon id={item.icon} className="mr-1 text-lg" />
                {item.label}
              </Link>
            ),
          )}
        </div>
      </div>

      {/* Mobile controls — share the wordmark's row, aligned right. */}
      <div className="flex items-center justify-end gap-5 md:hidden">
        <ThemeToggle />
        <button
          ref={burgerRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="drawer"
          className="cursor-pointer"
        >
          <Icon id="bars" className="text-3xl" />
        </button>
      </div>
              
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/50 md:hidden"
          onClick={() => setOpen(false)}
        >
          <div
            id="drawer"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="h-full w-2/3 overflow-y-auto px-5 pt-10 shadow-2xl"
            style={{ background: "var(--surface-shell)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="absolute top-4 right-4 cursor-pointer"
            >
              <Icon id="close" className="text-2xl" />
            </button>

            <a
              href={`mailto:${profile.email}`}
              className="mt-3 block"
              onClick={() => setOpen(false)}
            >
              <Icon id="envelope" className="text-lg" />
              <span className="ml-4 capitalize">email</span>
            </a>

            {items.map((item) =>
              item.plain ? (
                <a
                  key={item.label}
                  href={item.href}
                  download={item.download}
                  className="mt-3 block"
                  onClick={() => setOpen(false)}
                >
                  <Icon id={item.icon} className="text-lg" />
                  <span className="ml-4 capitalize">{item.label}</span>
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="mt-3 block"
                  onClick={() => setOpen(false)}
                >
                  <Icon id={item.icon} className="text-lg" />
                  <span className="ml-4 capitalize">{item.label}</span>
                </Link>
              ),
            )}

            <div className="absolute bottom-0 mb-4 flex gap-4">
              {profile.socials.map((s) => (
                <a
                  key={s.kind}
                  href={s.href}
                  aria-label={s.label}
                  target={s.kind === "email" ? undefined : "_blank"}
                  rel={s.kind === "email" ? undefined : "noopener noreferrer"}
                >
                  <Icon id={s.kind} className="text-lg" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
