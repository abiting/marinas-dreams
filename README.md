# Marina’s Dreams

An English personal film and art journal for Marina, a Taiwan-based barista. The website follows the approved Taipei café scrapbook direction: paper ivory, coffee brown, Lora typography, and restrained editorial details.

## Run and build

This project uses Node.js 22+ and has no external runtime or build dependencies.

```sh
npm run dev
npm run build
npm run check
```

The development service listens on port 3000. `dist/` contains complete static HTML for every page, not a client-rendered shell. Unknown paths return a genuine 404 in the preview service; `404.html` is supplied for static hosting.

## Content and settings

`src/content.json` contains the English About paragraphs, the three reviews, metadata, publication dates, and reference links. Add future documentary or contemporary-art content through the same content model and extend the route builder as needed. There is no fabricated rating or empty article page.

`src/site.json` holds the confirmed published public origin. Leave it unset until the platform supplies a real public URL. The builder omits guessed canonical and Open Graph URL tags while it is unset, then creates canonical URLs, sitemap.xml, robots.txt, and absolute schema IDs once the real origin is configured.

`scripts/build.mjs` builds all pages and their route-specific metadata. `assets/styles.css` owns the responsive reading layout. `assets/main.js` enhances the archive with search and article pages with clipboard sharing; all navigation and article content work without JavaScript.

The original supplied banner is preserved in `assets/banner.jpg` and website storage. The user-supplied original HTTPS URL is used for site-wide Open Graph and Twitter image metadata. Marina is a single shared `Person`; every review is an `Article` referencing that author.

## Pages

- `/`
- `/film-reviews/`
- `/about-marina/`
- `/lust-caution-2007-review/`
- `/the-bucket-list-2007-review/`
- `/mewtwo-strikes-back-review/`

## Deployment

The managed project builds with `node scripts/build.mjs` and publishes `dist/`. Publication uses the accepted canonical main checkpoint. CSS and JavaScript use content-hashed filenames so future updates cannot inherit a stale old asset. A small Node container serves prebuilt page HTML and returns a genuine 404 for unknown paths; this avoids the static gateway’s default homepage fallback. The deployment has no database or login.

After connecting a custom domain, replace `src/site.json` publicOrigin with the confirmed domain, build and check, save a checkpoint, and publish again. Google Search Console verification requires access to that domain or the chosen verification method; this project does not invent verification tokens.
