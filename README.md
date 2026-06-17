# Design Compare

Compare Figma, iOS, and Android screenshots side by side and export a PDF report.

**Live app:** https://shanenoormohamed.github.io/design-compare/

## For the team

### What you need

- A browser (Chrome, Safari, or Edge)
- Three screenshots: Figma design, iOS app, Android app (PNG, JPG, or WebP)

### How to use

1. Open the app URL above.
2. Upload in order:
   - **Step 1:** Figma screenshot
   - **Step 2:** iOS screenshot
   - **Step 3:** Android screenshot
3. Review the three images side by side.
4. Add notes (spacing, copy, layout differences, etc.).
5. Click **Export PDF** to download a report with all three images and your notes.
6. Use **Replace** on any slot to swap an image, or **Start over** to reset.

Screenshots and PDFs are generated entirely in your browser — nothing is uploaded to a server.

## For developers

### Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173/

### Build

```bash
npm run build
npm run preview
```

### Deploy

Pushes to `main` deploy automatically via GitHub Actions to GitHub Pages.

After the first deploy, enable Pages in the repo if needed:

**Settings → Pages → Build and deployment → Source: GitHub Actions**

If you rename the repo, update the `base` path in `vite.config.ts` to match `/your-repo-name/`.
