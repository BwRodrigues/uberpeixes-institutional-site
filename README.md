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

## Brand colors

The stylesheet centralizes the logo-inspired palette in `:root`: indigo `#45409b`, cyan `#00b2e5`, and orange `#ff7900`. Darker variants are used for readable text and interactive states; pale surfaces balance the saturated accents. Change the tokens in `src/styles/global.css` to adjust the theme.

## Content and assets

- Confirmed contact channels: WhatsApp `5534998910880` and Instagram `@uberpeixesornamentais`.
- No address, business hours, inventory, prices or customer testimonials have been invented.
- Location and review links open the official Google Maps profile supplied by the owner: `https://maps.app.goo.gl/zRgtCTnjvL8xZGiH7`. Visitors can consult real reviews in the profile’s Reviews tab. No ratings or testimonials are copied or fabricated.
- The original logo supplied by the owner is in `src/assets/logo-uberpeixes.png` and appears in the header and footer. Its white margins are framed with CSS without modifying the artwork. The favicon embeds this exact original PNG inside an SVG, framing only the white margins in a square viewport. It preserves the complete logo and its proportions without adding shapes, borders, or decorative elements.
- The owner-supplied entrance photograph is in `src/assets/entrada-uberpeixes.jpg` and is displayed in the hero. Astro generates responsive WebP variants with explicit dimensions and alternative text. The originals are preserved; visual framing uses CSS. The remaining gallery areas are visibly labeled placeholders awaiting additional photographs.
- No Zleep Baby project files or assets were used. Fonts use local system fallbacks; no external font service is required.
- Footer credit: “Desenvolvido por Brendow Rodrigues”.
