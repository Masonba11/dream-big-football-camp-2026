# Dream Big Football Camp 2026

Marketing site for **Dream Big Football Camp 2026**, hosted by Braylen Russell — Vite, React, TypeScript, Tailwind CSS.

- **GitHub:** https://github.com/Masonba11/dream-big-football-camp-2026  
- **Production (Vercel):** https://dream-big-football-camp-2026.vercel.app  

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy on Vercel

This project is linked to Vercel (`vercel.json` sets `npm run build` → `dist`). Pushes to `main` on GitHub can trigger **automatic production deploys** if that Git integration is enabled in the Vercel project settings.

To deploy manually from your machine (with [Vercel CLI](https://vercel.com/docs/cli) logged in):

```bash
npx vercel deploy --prod
```

New Vercel project from GitHub: [Vercel → Add New Project](https://vercel.com/new) → import `Masonba11/dream-big-football-camp-2026` → Framework Preset **Vite**, root `.`, build `npm run build`, output `dist`.
