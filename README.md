# Uberpeixes Ornamentais

Responsive institutional website built with Astro, TypeScript and native CSS. Static output, no backend, credentials or client-side JavaScript required.

## Development

Requires Node.js 22.12+ (validated with Node.js 24) and npm.

```sh
npm ci
npm run dev
```

## Validation

```sh
npm run check
npm run build
npx playwright install chromium
npm test
```

Tests start the production preview automatically and cover desktop (1440px), mobile (375px) and small mobile (320px): rendering, horizontal overflow, contact destinations, anchor navigation, keyboard skip link and reduced motion. If Chromium is already installed, skip its download and run:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm test
```

Use `npm run preview` to inspect the production build. Deploy `dist/` to a static hosting provider. No domain or hosting provider has been assumed.

## Content and assets

- Confirmed contact channels: WhatsApp `5534998910880` and Instagram `@uberpeixesornamentais`.
- No address, business hours, inventory, prices or customer testimonials have been invented.
- Location and review links open the official Google Maps profile supplied by the owner: `https://maps.app.goo.gl/zRgtCTnjvL8xZGiH7`. Visitors can consult real reviews in the profile’s Reviews tab. No ratings or testimonials are copied or fabricated.
- The wordmark, favicon and CSS fish illustration are provisional original graphics, not an official logo or photographs. Replace the header/footer wordmarks with an authorized logo when available, keeping accessible text.
- Photo areas are visibly labeled placeholders. Replace them with authorized local images, descriptive alternative text, explicit dimensions and optimized Astro image output. The hero illustration is also labeled as a future photo space.
- No Zleep Baby project files or assets were used. Fonts use local system fallbacks; no external font service is required.
- Footer credit: “Desenvolvido por Brendow Rodrigues”.
