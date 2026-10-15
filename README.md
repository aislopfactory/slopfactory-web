# Slop Factory website

Static, bilingual (EN/KO) site built with [Astro](https://astro.build). No client framework, no runtime server, no external requests (fonts are self-hosted via npm packages).

## Commands
```bash
npm install
npm run dev        # http://localhost:4321 with hot reload
npm run build      # static output in ./dist
npm run preview    # serve ./dist on 0.0.0.0:4321
npm run screenshots  # needs `npm run build` first + Playwright chromium; writes ./screenshots
```
(If `NODE_ENV=production` is set, use `npm install --include=dev`.)

## Structure
- `src/pages/[lang]/…` — `/en/` and `/ko/` home, blog index, blog post, RSS. `/` redirects by saved choice / browser language.
- `src/i18n/ui.ts` — all UI strings for both languages. Edit copy here.
- `src/content/blog/{en,ko}/<slug>.md` — blog posts. **Same filename in both folders = translations** (language switcher and hreflang link them). A post in only one language still works; the switcher falls back to the other blog index.
- `src/components/MediaSlot.astro` — one component for game screenshots, video, YouTube trailers and empty placeholders.
- `src/styles/global.css` — design tokens, Korean typography rules (`:lang(ko)` → `word-break: keep-all`, looser leading).

## Adding a post
Create `src/content/blog/en/my-post.md` and `src/content/blog/ko/my-post.md`:
```md
---
title: "…"
description: "…"
date: 2026-11-01
tags: ["studio"]
cover: /media/posts/my-post.jpg   # optional, file in public/media/posts/
coverAlt: "…"
draft: true                       # optional; drafts are hidden from production builds
---
Markdown body.
```
Images/videos go in `public/media/…` and are referenced with absolute paths.

## Before deploy
`astro.config.mjs` has no `site` yet (domain not decided). Set it when the domain is approved to get absolute RSS/canonical URLs. Delete `template-post.md` (en + ko) when the real first post lands.
