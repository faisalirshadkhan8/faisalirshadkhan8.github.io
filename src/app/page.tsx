import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";
import { Readme } from "@/components/Readme";
import { Works } from "@/components/Works";
import { Contact } from "@/components/Contact";
import { profile } from "@/content/profile";
import { site, absoluteUrl } from "@/content/site";

/**
 * The home page stays a tight one-pager. Depth lives at /projects/<slug>/
 * and /blog/<slug>/ rather than growing this page.
 */
export default function Home() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    url: absoluteUrl("/"),
    email: `mailto:${profile.email}`,
    address: { "@type": "PostalAddress", name: profile.location },
    sameAs: profile.socials
      .filter((s) => s.kind !== "email")
      .map((s) => s.href),
    description: site.description,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Hero />
      <Skills />
      <Readme />
      <Works />
      <Contact />
    </>
  );
}
