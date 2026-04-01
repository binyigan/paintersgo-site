# PaintersGO Site

This repository now hosts the new React-based PaintersGO landing page.

## Current stack

- `React + Vite + TypeScript`
- Static assets served from `static/`
- Production output built to `dist/`
- Vercel config in `vercel.json`

## Key files

- `src/App.tsx`: homepage structure and bilingual copy
- `src/styles.css`: visual system and responsive layout
- `static/logo.png`: current logo used by the site
- `static/PaintersGO.apk`: current APK download target
- `vercel.json`: Vercel build/output settings

## Local development

Use local dev only for previewing changes on this machine.

```bash
npm install
npm run dev
```

Default preview URL:

```text
http://127.0.0.1:4174
```

Important:

- `npm run dev` is only for local preview
- It does not update `paintersgo.top`
- The real website is deployed by Vercel from GitHub

## Release workflow

This project goes live through:

`local changes -> git commit -> git push origin main -> Vercel deploys -> https://paintersgo.top`

If you want to refresh the real website, do this instead of starting a local dev server:

```bash
npm run build
git status --short
git add index.html src/App.tsx src/styles.css
git commit -m "Describe the change"
git push origin main
```

Notes:

- Pushing to `main` triggers the Vercel deployment for `paintersgo.top`
- After pushing, wait a short moment and then refresh the website
- If the goal is to see the real online result, prefer deploy flow over `npm run dev`

## Production build

```bash
npm run build
```

Build output will be generated in `dist/`.

## Asset replacement plan

The current homepage is intentionally structured so real assets can be swapped in later without rewriting layout:

- Hero product visual
- AI generation screenshots or recordings
- 3D painting editor screenshots
- Collaboration flow visuals
- Cloud repair comparison visuals
- O2O manufacturing / printing visuals
- Contact and download destination updates

## Repository status

The previous Hugo/PaperMod structure has been removed from this working copy.

The repository is now organized around the React site only:

- `src/` for the application
- `static/` for public assets
- `dist/` for build output
- `vercel.json` for deployment settings
