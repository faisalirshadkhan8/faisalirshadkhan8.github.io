# Portfolio

Personal portfolio built with Next.js, statically exported and deployed to
GitHub Pages.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export into ./out
```

## Where the content lives

Every fact the site renders comes from `src/content/`. You should not need
to touch a component to change a detail.

| File | What it holds |
|---|---|
| `src/content/site.ts` | Site URL, title, description. **Set `url` before deploying.** |
| `src/content/profile.ts` | Name, role, tagline, email, socials, skills, impact figures, bio |
| `src/content/projects.ts` | Projects — one entry per card and per `/projects/<slug>/` page |
| `src/content/blog.ts` | Posts — one entry per `/blog/<slug>/` page |
| `src/content/types.ts` | The shape of all of the above |

Anything still reading `TODO` is a placeholder waiting to be replaced.

### Adding a project

Add an entry to `projects.ts`. The `slug` becomes the URL. `visual` picks
the card art:

- `{ kind: "gradient", from, to }` — a flat two-tone tile. The honest choice
  for work behind a login that you cannot screenshot.
- `{ kind: "diagram", src, alt }` — an SVG in `public/assets/images/arch/`.
- `{ kind: "image", src, alt }` — a screenshot in `public/assets/images/`.

### Adding a post

Add an entry to `blog.ts` with a unique `slug` and `published: true`. Bodies
use a small subset of Markdown: `## ` headings, `- ` list items, ``` fenced
code, and blank-line-separated paragraphs.

> Keep at least one post published. A static export cannot build the
> `/blog/[slug]` route from an empty list.

## Assets

Drop these into `public/assets/` and point `profile.ts` at them:

- **Portrait** — square, with headroom. Renders inside a 330–380px circle.
  With `portrait: null` the hero falls back to your initials in the accent.
- **Résumé** — a PDF. With `resumeHref: null` every résumé link disappears.
- **Favicon** — an `icon.png` or `icon.svg` in `src/app/`.

The Roboto subset and the seven illustration SVGs are already in place.

## Design tokens

Defined once in `src/app/globals.css`, under `@theme`.

| Token | Value |
|---|---|
| Accent | `#e45447` |
| Paper | `#f2f0ee` |
| Ink | `#58595b` |
| Gold | `#e29d51` |
| Slate | `#607393` |
| Night | `#0d1017` |
| Type | Self-hosted variable Roboto |

Light and dark both paint through the semantic `--surface-*` / `--text-*`
variables, so a new surface only needs defining in the two `:root` blocks.

## Deploying

1. Push to a GitHub repo.
2. **Settings → Pages → Source: GitHub Actions.**
3. Push to `main`. The workflow in `.github/workflows/deploy.yml` builds and
   publishes.
4. Set `url` in `src/content/site.ts` to the deployed origin so canonical
   and OG tags are right.

The workflow derives the base path from the repo name: a `<user>.github.io`
repo serves from the root, any other repo from `/<repo>/`. Renaming the repo
therefore does not break asset paths.

To build locally exactly as CI does:

```bash
NEXT_PUBLIC_BASE_PATH=/your-repo-name npm run build
```

## Accessibility

Skip link, focus-visible rings, a focus-trapped mobile drawer that restores
focus on close, `aria-pressed` on the theme toggle, and a
`prefers-reduced-motion` block that disables every animation. Worth keeping
as you edit.

## Credits

Layout and palette follow the structure of
[kenjimmy.xyz](https://kenjimmy.xyz/). Roboto is licensed under Apache 2.0;
see `public/assets/fonts/LICENSE.txt`.
