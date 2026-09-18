import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Sprite";
import { posts, getPost } from "@/content/blog";
import { parseProse, formatDate } from "@/lib/prose";
import { absoluteUrl } from "@/content/site";
import { profile } from "@/content/profile";

export function generateStaticParams() {
  return posts.filter((p) => p.published).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const url = absoluteUrl(`/blog/${post.slug}/`);
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      publishedTime: post.date,
      authors: [profile.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const blocks = parseProse(post.body);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Person", name: profile.name },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}/`),
  };

  return (
    <article className="mt-10 max-w-2xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link href="/blog" className="f-link text-sm">
        <Icon id="arrow-left" className="mr-1" />
        All writing
      </Link>

      <header className="mt-8">
        <p className="text-xs tracking-[0.18em] uppercase" style={{ color: "var(--text-muted)" }}>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>
        <h1
          className="mt-2 text-4xl leading-tight font-black"
          style={{ color: "var(--text-strong)" }}
        >
          {post.title}
        </h1>
        <div className="kj-border" />
      </header>

      <div className="mt-8">
        {blocks.map((block, i) => {
          switch (block.type) {
            case "heading":
              return (
                <h2
                  key={i}
                  className="mt-10 mb-3 text-2xl font-bold"
                  style={{ color: "var(--text-strong)" }}
                >
                  {block.text}
                </h2>
              );
            case "list":
              return (
                <ul key={i} className="my-4 space-y-2">
                  {block.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: "var(--color-prime)" }}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              );
            case "code":
              return (
                <pre
                  key={i}
                  className="my-6 overflow-x-auto rounded-lg p-4 text-sm"
                  style={{ background: "var(--surface-raised)" }}
                >
                  <code>{block.code}</code>
                </pre>
              );
            default:
              return (
                <p key={i} className="my-4 leading-relaxed">
                  {block.text}
                </p>
              );
          }
        })}
      </div>
    </article>
  );
}
