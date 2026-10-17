# Virtual freshwater aquarium — review notes

## Assets and scope

The aquarium is decorative scenery, not a photograph of the Uberpeixes store and not an inventory or compatibility recommendation. Existing store photographs, copy, branding, contact destinations and icons are unchanged.

All new artwork was generated for this task with the image generation tool, then packaged locally as WebP. No external image services, downloaded third-party stock, videos, libraries or runtime API calls are used. Source generation files are retained outside the repository in the task workspace. Generated species studies should be reviewed by an aquarist before publishing; they are artistic interpretations rather than a scientific identification reference.

- `public/aquarium/planted-freshwater-scene.webp`: naturalistic substrate, rocks, branched wood, broad-leaved epiphytes, ferns, ribbon plants, rosettes and moss. The upper center is left open for swimming. A smaller 768px variant is selected on mobile; desktop uses 1280px.
- `public/aquarium/fish/paracheirodon-innesi.webp`: neon tetra, blue lateral band and posterior red area.
- `public/aquarium/fish/pterophyllum-scalare.webp`: silver angelfish with vertical bars and elongated fins.
- `public/aquarium/fish/corydoras-paleatus.webp`: mottled armored bottom catfish.
- `public/aquarium/fish/baryancistrus-xanthellus.webp`: dark gold nugget pleco with yellow spotting and fin edges.
- `public/aquarium/fish/symphysodon-wild.webp`: natural brown discus study with fine turquoise patterning.
- `public/aquarium/fish/hyphessobrycon-herbertaxelrodi.webp`: black neon tetra study.

The supplied official logo is never used to draw or replace these fish. Generated sprites have actual alpha transparency; the PNG sprite atlas was divided into species cells, trimmed to transparent bounds, resized and encoded as WebP. No real store photograph was retouched or replaced.

## Implementation

`src/components/aquarium/Aquarium.astro`, `fish.ts` and `aquarium.css` contain the markup, typed species configuration and animation rules.

The scene is fixed to the viewport and does not restart when scrolling. Background, fish and content have separate layers; `aria-hidden`, `inert` and `pointer-events: none` keep the decor out of interaction and accessibility navigation. Opacity is restricted to the decorative layer. Page content remains fully opaque and the existing palette and typography are preserved. Gallery cards and the closing CTA retain readable surfaces.

Desktop shows ten small fish instances in six species studies. Mobile shows four instances (two neons, one angelfish and one corydoras). Midwater fish follow slow horizontal routes with gentle vertical drift. Mirroring occurs beyond the visible viewport while faded out. Bottom fish use short local movements and extended pauses; the pleco has the slowest bottom movement. Only `transform` and `opacity` are animated; no layout properties or scroll listeners are used. Plants and lighting remain static for performance and visual restraint.

A small script controls play state only. The footer button pauses/resumes movement, and animations pause while the tab is hidden. With JavaScript disabled the default is a static background. `prefers-reduced-motion: reduce` removes every aquarium animation and keeps a static composition. Printing omits the aquarium.

## Metadata and publication

The existing `<head>` metadata and icons are unchanged. Fetching the published Cloudflare Pages URL returned HTTP 403 in this environment, so live Open Graph/LinkedIn behavior could not be independently checked. No animated asset is added to social metadata, and no unverified replacement title, description or sharing image is introduced.

This work remains on a dedicated local branch for review. There is no push, PR creation, Cloudflare preview or production deployment in this task because branch publication may trigger automatic Pages builds. Review the screenshots and species artwork before authorizing publication.

## Validation and limits

Run the repository's check, build, formatting and Playwright commands. Aquarium tests exercise local asset responses, movement, pause/resume, fixed positioning while scrolling, mobile density, reduced motion and operation without JavaScript. Existing tests retain coverage for factual links, contact navigation, icons, image loading, console errors, keyboard access and horizontal overflow.

Inspect the aquarium at desktop, tablet and phone widths, with motion both enabled and disabled. Background art must remain secondary to the institutional content. The final desktop scene is 170,206 bytes, the mobile scene is 71,074 bytes, and all six shared fish sprites total 135,604 bytes. The bundled inline control script is 520 bytes. A local Chromium sample averaged approximately 16.7ms between animation frames at desktop, tablet and phone viewport sizes. Transfer size and controlled browser animation checks are measured locally; these do not establish production Core Web Vitals, battery consumption or performance on every physical device. LinkedIn inspection and physical low-end-device review remain external checks.
