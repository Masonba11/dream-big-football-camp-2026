# Dream Big Football Camp 2026

Marketing site for **Dream Big Football Camp 2026**, hosted by Braylen Russell — Vite, React, TypeScript, Tailwind CSS.

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

1. Push this repo to GitHub (see below).
2. In [Vercel](https://vercel.com) → **Add New Project** → import the GitHub repository.
3. Vercel should detect **Vite**; defaults are **Build Command** `npm run build` and **Output Directory** `dist` (also set in `vercel.json`).
4. Deploy. Static assets (e.g. hero video) are served from `public/`.

## GitHub (first time)

```bash
git init
git add -A
git commit -m "Initial commit: Dream Big Football Camp 2026 site"
gh repo create YOUR-REPO-NAME --public --source=. --remote=origin --push
```

Replace `YOUR-REPO-NAME` with your chosen repository name, or create an empty repo on GitHub and:

```bash
git remote add origin https://github.com/YOUR_USER/YOUR_REPO.git
git branch -M main
git push -u origin main
```
