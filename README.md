# Spray Tan Israel

Static Next.js website with 36 pages: nine pages each in English, Hebrew, French, and Russian. Hebrew pages use RTL direction. Booking opens WhatsApp; no booking form collects customer data.

## Local development

```sh
npm ci
npm run dev -- --port 3002
```

Open `http://localhost:3002/`.

## Production export

```sh
npm run build
npm run verify:export
npm test
```

The build creates `out/`. The verifier checks all 36 localized pages, directions, internal routes, local assets, booking links, and deployment files. Photographs use pre-generated WebP assets in `public/`; no image server is required.

## Cloudflare Pages settings

Connect the private GitHub repository to **Cloudflare Pages** using the **Next.js (Static HTML Export)** preset. Set the build command to `npm run build` and the output directory to `out`. Use Node.js 20.9 or newer (Cloudflare's current v3 build image uses Node.js 22). No Workers adapter is needed.

The `public/_redirects` file retains legacy `/en` aliases. `public/_headers` supplies the response headers previously configured in Next.js. These files are copied into `out/` and applied by Cloudflare Pages; a generic local static server may not apply them.

`research/`, `review/`, local builds, dependencies, environment files, and backups stay on the developer's machine and are excluded from Git. Do not publish the original research material. Before connecting the live domain, confirm photo publication rights, any customer reviews, and the canonical domain in `src/lib/site.ts`.
