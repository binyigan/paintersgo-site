# PaintersGO Site

This repository now serves the PaintersGO website from the repository root using Next.js.

## Naming

- GitHub repository: `paintersgo-site`
- Vercel project: `paintersgo-site`
- npm package name: `paintersgo-site`
- Local folder names such as `my-app-site` are only workspace names and do not define the production project.

## Choose the Right Workflow (Important)

Use the workflow based on your goal:

| Goal | Correct workflow |
| --- | --- |
| Preview locally on your own machine only | `npm run dev` |
| View changes on the real online site (`https://paintersgo.top`) | **Release Workflow** (`build -> lint -> commit -> push main -> Vercel deploy`) |

Important:

- `npm run dev` is **local-only** and does not update the online site.
- If you need to check the effect online, you must push to `main` so Vercel can deploy.

If someone says any of the following:
- "启动线上"
- "我去线上看效果"
- "发布给我看"

Always use **Release Workflow**, not `npm run dev`.

## Stack

- `Next.js 16`
- `React 19`
- `Tailwind CSS v4`
- `next/font` for self-hosted Google fonts
- `lucide-react` for UI icons

## Current Site Scope

The live site now includes:

- Dark AI landing page hero with APK download CTA
- Engine logo cloud for Meshy, Rodin, Tripo, and Hunyuan
- Bento-style feature grid for generation, repair, collaboration, and printing
- Five-step workflow section
- Tech stack section
- Final download CTA and footer

## Key Files

- `src/app/page.tsx`: homepage structure
- `src/app/layout.tsx`: global metadata and font setup
- `src/app/globals.css`: theme tokens and shared landing page styles
- `public/AR.png`: hero visual
- `public/app-assets/video_to_3d1.webp`: feature visual
- `public/app-assets/demo_refine.webp`: repair feature visual

## App Source Reference

The website references the real PaintersGO Android app repository:

- `https://github.com/binyigan/paintersgo`

A local inspection copy may exist during development as `paintersgo-source/`, but it is not part of the production site.

## Local Development

For local preview/debug only (not online deployment):

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run lint
```

## Release Workflow

This is the only workflow that updates the online site (`https://paintersgo.top`).

The production site updates through:

`local changes -> git commit -> git push origin main -> Vercel deploys -> https://paintersgo.top`

If you want to view a new version online, use:

```bash
npm install
npm run build
npm run lint
git status --short
git add .
git commit -m "Describe the change"
git push origin main
```

After push, verify in order:

1. GitHub push succeeded (`main` updated)
2. Vercel deployment finished (status: Ready)
3. Open `https://paintersgo.top` and hard refresh

## Notes

- `clone-studio/` is a working directory used during the rebuild and is not the production root.
- `paintersgo-source/` is a local reference checkout of the Android app and should not be deployed.
