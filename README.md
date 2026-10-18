# Uberpeixes Ornamentais

Responsive institutional website built with Astro, TypeScript and native CSS. Static output with no backend or credentials. Institutional content works without JavaScript; a small optional script controls the decorative aquarium’s play state.

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

- Confirmed contact channels remain WhatsApp `5534998910880`, Instagram `@uberpeixesornamentais` and the owner's Google Maps profile `https://maps.app.goo.gl/zRgtCTnjvL8xZGiH7`.
- Institutional copy was supplied by the owner. No address, hours, prices, ratings, certifications, guarantees or business age are invented. Google reviews remain on the Google profile.
- `src/assets/logo-oficial.png` is the supplied official logo, displayed with `object-fit: contain` without cropping or distortion. Astro generates small WebP renditions for the header, footer and decorative hero composition.
- `public/images/` contains the four supplied, lightly treated WebP photographs used in the gallery. Images with people must have the depicted people's authorization before public deployment. Authorization is a review prerequisite; it has not been independently confirmed.
- Gallery captions describe store visits, products and the tank infrastructure, without presenting maintenance tanks as finished decorative aquariums. The promotional sand image and the story-overlaid facade image are not used.
- The original entrance photograph remains in the visit section, lazy-loaded below the fold.
- `public/icons/official-v2/` contains the exact supplied official fish PNGs at 32, 180, 192 and 512 pixels, plus `favicon.png`. The versioned directory replaces the old SVG favicon. `public/site.webmanifest` references the 192 and 512 pixel icons, without declaring them maskable.
- No Zleep Baby project assets or new dependencies are used. Footer credit remains “Desenvolvido por Brendow Rodrigues”.

## Review

Run the validation commands above. Review at 320px, 375px, tablet and desktop widths; verify the complete logo, unclipped people in gallery cards, the visit photo, keyboard navigation and real contact destinations. Confirm authorization for all identifiable people before merging or deploying. No deployment is performed by this change.

## Project status — v1.0 completed

This institutional website was developed as a practical learning project, with AI-assisted implementation and human review. The first production version is complete; future photo updates are optional enhancements.

### What I practiced

- Responsive layouts with Astro, TypeScript and native CSS.
- Git workflows: branches, commits, pull requests and code integration.
- Continuous deployment using GitHub and Cloudflare Pages.
- Diagnosing and correcting build and environment compatibility issues.
- Optimizing images, branding assets and browser icons.
- Testing navigation, accessibility basics, contact links and mobile layouts.

**Key takeaway:** experience with the complete web development cycle, from implementation and troubleshooting to automated checks and publication.

**Live site:** https://uberpeixes-institutional-site.pages.dev/

**Status:** Completed (v1.0). Any future visual improvements will be handled separately.

## Virtual aquarium (under review)

See [the aquarium review notes](docs/aquarium.md) for generated asset provenance, species configuration, motion controls, validation and publication limits. The background remains static without JavaScript or when reduced motion is requested.

## Catálogo de espécies — protótipo

O catálogo em `/especies/` usa cinco registros e um template de ficha reutilizável. Consulte [como cadastrar e revisar espécies](docs/species-catalog.md), [notas de pesquisa e limitações](docs/species-research.md) e [créditos das fotografias](docs/species-image-credits.json). As fichas ficam sem indexação até a revisão da loja.
