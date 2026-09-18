import type { Metadata } from "next";
import "./globals.css";
import { Sprite } from "@/components/Sprite";
import { Shell } from "@/components/Shell";
import { SmoothScroll } from "@/components/SmoothScroll";
import { themeInitScript } from "@/components/ThemeToggle";
import { site, absoluteUrl } from "@/content/site";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${profile.name}`,
  },
  description: site.description,
  authors: [{ name: profile.name }],
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    type: "website",
    siteName: profile.name,
    title: site.title,
    description: site.description,
    url: absoluteUrl("/"),
    locale: site.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f0ee" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1017" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/*
          Applies the stored/system theme before first paint. Without this
          a dark-mode visitor gets a white flash on every navigation.
        */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <link
          rel="preload"
          href={`${site.basePath}/assets/fonts/roboto-latin-var.woff2`}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <SmoothScroll />
        <Sprite />
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
