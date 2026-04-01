# PaintersGO Site

This repository now serves the PaintersGO website from the repository root using Next.js.

## Stack

- `Next.js 16`
- `React 19`
- `Tailwind CSS v4`
- `Three.js` for the hero stage and Lite Viewer

## Current Site Scope

The live site now includes:

- Hero section with the real `ToTu.glb` model
- `Live Editor Lite` browser previewer
- `AI Power` section grounded in real app capabilities
- `Collaboration` section based on the app's room UI
- `O2O Printing` section based on the app's O2O flow
- Gallery and APK download entry

## Key Files

- `src/app/page.tsx`: homepage structure
- `src/components/model-stage.tsx`: hero 3D model stage
- `src/components/live-editor-lite.tsx`: embedded Lite Viewer section
- `src/components/feature-showcase.tsx`: interactive Collaboration and O2O modules
- `public/paintersgo-lite/index.html`: standalone browser viewer
- `public/models/ToTu.glb`: current live hero / preview model

## App Source Reference

The website references the real PaintersGO Android app repository:

- `https://github.com/binyigan/paintersgo`

A local inspection copy may exist during development as `paintersgo-source/`, but it is not part of the production site.

## Local Development

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

The production site updates through:

`local changes -> git commit -> git push origin main -> Vercel deploys -> https://paintersgo.top`

If you want to publish a new version:

```bash
npm install
npm run build
npm run lint
git status --short
git add .
git commit -m "Describe the change"
git push origin main
```

## Notes

- `clone-studio/` is a working directory used during the rebuild and is not the production root.
- `paintersgo-source/` is a local reference checkout of the Android app and should not be deployed.
