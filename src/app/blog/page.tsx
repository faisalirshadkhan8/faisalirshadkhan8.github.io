import type { Metadata } from "next";
import Link from "next/link";
import { publishedPosts } from "@/content/blog";
import { formatDate } from "@/lib/prose";
import { absoluteUrl } from "@/content/site";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes on building software.",
  alternates: { canonical: absoluteUrl("/blog/") },
};

export default function BlogIndex() {
  const posts = publishedPosts();

  return (
    <section className="mt-10 max-w-3xl">
      <h1 className="text-4xl leading-none font-black" style={{ color: "var(--text-strong)" }}>
        Writing
      </h1>
      <p className="mt-2 text-lg">Notes on building software</p>
      <div className="kj-border" />

      {posts.length === 0 ? (
        <p className="mt-10" style={{ color: "var(--text-muted)" }}>
          No posts yet. Set <code>published: true</code> on an entry in{" "}
          <code>src/content/blog.ts</code> to publish one.
        </p>
      ) : (
        <ul className="mt-10 space-y-8">
          {posts.map((post) => (
            <li key={post.slug}>
              <article>
                <p className="text-xs tracking-[0.18em] uppercase" style={{ color: "var(--text-muted)" }}>
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </p>
                <h2 className="mt-1 text-2xl font-bold">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="underline-offset-4 hover:underline"
                    style={{ color: "var(--text-strong)" }}
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2">{post.description}</p>
                {post.tags.length > 0 && (
                  <p className="mt-3 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full px-3 py-1 text-xs"
                        style={{ background: "var(--surface-raised)" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </p>
                )}
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
