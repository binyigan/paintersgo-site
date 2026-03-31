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

```bash
npm install
npm run dev
```

Default preview URL:

```text
http://127.0.0.1:4174
```

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
