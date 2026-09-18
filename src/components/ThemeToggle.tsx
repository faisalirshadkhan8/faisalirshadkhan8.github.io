"use client";

import { useSyncExternalStore } from "react";
import { Icon } from "./Sprite";

/**
 * The source always booted light and only went dark if you had toggled
 * before — it never consulted the OS. Here an explicit choice is stored
 * and wins; with no stored choice we follow `prefers-color-scheme` and
 * keep following it if the OS flips mid-session.
 */
export const themeInitScript = `(function(){try{var s=localStorage.getItem("theme");var m=window.matchMedia("(prefers-color-scheme: dark)").matches;if(s==="dark"||(s!=="light"&&m)){document.documentElement.classList.add("dark")}}catch(e){}})();`;

function storedTheme(): "dark" | "light" | null {
  try {
    const value = localStorage.getItem("theme");
    return value === "dark" || value === "light" ? value : null;
  } catch {
    // Storage blocked (private mode, cookie settings). Fall back to the OS.
    return null;
  }
}

/**
 * The theme lives on <html>, put there by the inline script before React
 * boots. Reading it through useSyncExternalStore keeps React in step with
 * that external state instead of racing it from an effect.
 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });

  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const onMediaChange = (e: MediaQueryListEvent) => {
    // An explicit choice outranks the OS; otherwise track it live.
    if (storedTheme()) return;
    document.documentElement.classList.toggle("dark", e.matches);
    onChange();
  };
  media.addEventListener("change", onMediaChange);

  return () => {
    observer.disconnect();
    media.removeEventListener("change", onMediaChange);
  };
}

const isDark = () => document.documentElement.classList.contains("dark");

// On the server there is no class yet, so render the light-mode icon and
// let the first client read correct it.
const serverSnapshot = () => false;

export function ThemeToggle({ className = "" }: { className?: string }) {
  const dark = useSyncExternalStore(subscribe, isDark, serverSnapshot);

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // Storage blocked; the class still applies for this session.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={`cursor-pointer ${className}`}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={dark}
      suppressHydrationWarning
    >
      <Icon id={dark ? "moon" : "sun"} className="text-lg" />
    </button>
  );
}
