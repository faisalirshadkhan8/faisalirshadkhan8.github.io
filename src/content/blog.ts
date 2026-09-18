import type { BlogPost } from "./types";

/**
 * Posts live here as plain data so the site builds with no MDX pipeline
 * and no runtime filesystem reads (both of which fight static export).
 *
 * `body` is parsed by src/lib/prose.ts:
 *   - a line starting with "## " becomes a heading
 *   - a line starting with "- " becomes a list item
 *   - a run of ``` fences becomes a code block
 *   - anything else is a paragraph
 * Blank lines separate blocks.
 */
export const posts: BlogPost[] = [
  {
    slug: "hello",
    title: "Hello",
    description:
      "A placeholder post. Replace it with your own writing, or delete it once you have a real one.",
    date: "2026-09-18",
    tags: ["writing"],
    // Static export needs at least one published post to generate the
    // /blog/[slug] route, so keep one entry published at all times.
    published: true,
    body: `This is a placeholder post so the blog route builds. Replace the text, the title and the slug with your own writing.

## Formatting

Paragraphs are plain lines. Blank lines separate blocks. Lists look like this:

- a line starting with a dash becomes a list item
- lists do not nest; the parser is deliberately flat

Fenced blocks render as code:

\`\`\`ts
const example = "fenced code blocks render as code";
\`\`\`

## Adding a post

Add an entry to \`src/content/blog.ts\` with a unique \`slug\`, set \`published: true\`, and it appears on the index and gets its own static route.
`,
  },
];

/** Published posts, newest first. */
export function publishedPosts(): BlogPost[] {
  return posts
    .filter((p) => p.published)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug && p.published);
}
