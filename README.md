# bdnguyen.dev

Personal blog and writing space, built with [Astro](https://astro.build) and deployed to [Cloudflare Workers](https://workers.cloudflare.com/).

## Stack

- **Astro** (static output) with **TypeScript** and **Tailwind CSS**
- Content collections for posts (`src/content/post/`), schema-validated with Zod
- **Expressive Code** for syntax-highlighted code blocks
- **Pagefind** for build-time static search indexing
- **Giscus** for comments, auto-generated **OG images** (Satori + resvg), RSS feed, and sitemap
- Self-hosted variable fonts (Newsreader, Inter, JetBrains Mono) via Fontsource
- Deployed as a Cloudflare Worker serving static assets, with Workers Builds handling CI/CD on push (no GitHub Actions needed)

## Project structure

```text
/
├── public/                  # static assets served as-is
├── src/
│   ├── assets/               # images & fonts processed by Astro's image/font pipeline
│   ├── components/           # Astro components (blog/, layout/)
│   ├── content/post/         # blog posts (Markdown), validated by src/content.config.ts
│   ├── data/                 # post/showcase helpers (sorting, tags, etc.)
│   ├── layouts/               # page layouts (Base, BlogPost)
│   ├── pages/                 # file-based routes, incl. rss.xml, robots.txt, og-image
│   ├── plugins/                # custom remark/rehype plugins
│   ├── styles/                 # global.css (theme tokens, base styles)
│   └── site.config.ts           # site-wide config (profile, comments, analytics, nav)
├── astro.config.ts
├── wrangler.jsonc            # Cloudflare Worker config
└── package.json
```

## Commands

All commands are run from the root of the project, from a terminal:

| Command              | Action                                                          |
| :-------------------- | :--------------------------------------------------------------- |
| `npm install`          | Installs dependencies                                            |
| `npm run dev`          | Starts local dev server at `localhost:4321`                       |
| `npm run build`        | Type-checks, builds to `./dist/`, and builds the Pagefind index    |
| `npm run preview`      | Preview the production build locally                              |
| `npm run check`        | Run `astro check` only                                            |
| `npm run format`       | Format the project with Prettier                                  |
| `npm run format:check` | Check formatting without writing                                  |

## Deploying

```bash
npm run build
npx wrangler deploy
```

In practice, deploys happen automatically: Cloudflare **Workers Builds** is connected to this repo and deploys on every push to `main` — see the "Automating deploys from GitHub" section of the [site's own write-up](src/content/post/yet-another-rewrite-2026-edition.md) for how that's wired up, alongside the domain/DNS setup via Porkbun + Cloudflare.
