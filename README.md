# justjor.me

Personal site for Jor Allen — landing page, blog, project showcase.

Built with [Astro 5](https://astro.build) + [Tailwind CSS](https://tailwindcss.com).
Hosted on [Cloudflare Pages](https://pages.cloudflare.com).

## Local development

```bash
# Install dependencies (one time)
npm install

# Start dev server (http://localhost:4321)
npm run dev

# Build for production (output to ./dist)
npm run build

# Preview the production build locally
npm run preview
```

## Project structure

```
src/
├── components/      # Reusable Astro components (Header, Footer)
├── content/
│   └── blog/        # Markdown blog posts (add new .md files here)
├── layouts/         # Page wrappers (Layout.astro)
├── pages/           # Routes
│   ├── index.astro  # Homepage
│   └── blog/        # /blog and /blog/[slug]
└── styles/          # Tailwind base + global styles
```

## Writing a new blog post

1. Create a new file: `src/content/blog/your-post-slug.md`
2. Add frontmatter at the top:
   ```yaml
   ---
   title: "Your post title"
   description: "One-sentence summary."
   pubDate: 2026-06-15
   tags: ["life-os", "case-study"]
   ---
   ```
3. Write the body in markdown.
4. Run `npm run dev` to preview locally.
5. Commit and push to GitHub → Cloudflare Pages auto-deploys in ~60 seconds.

## Updating the homepage content

The homepage content is hardcoded in `src/pages/index.astro` — open the file in VS Code and edit
the hero text, about paragraph, featured story, or projects array.

## Updating site colors / fonts

- Brand palette is in `tailwind.config.mjs` under `theme.extend.colors`
- Body / heading fonts are loaded from Google Fonts in `src/layouts/Layout.astro`
- Global CSS overrides are in `src/styles/global.css`

## Deploying

This repo is connected to Cloudflare Pages. Pushing to `main` triggers a build and deploy.
Custom domain `justjor.me` is configured in the Cloudflare Pages dashboard.

---

Made by Jor (allenjory@gmail.com) — June 2026.
