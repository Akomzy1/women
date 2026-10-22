# Know Your Cycle — local build

Build one static page at `/`, with a shared-token style tile at `/style-tile.html`. Use Node to render the editable content and product config into semantic HTML; small browser modules enhance the menu, sample viewer, and optional companion selection. No framework or runtime dependencies are needed.

## Direction

Warm editorial publishing: ivory paper, deep plum, forest accents, restrained gold rules, generous serif headings and readable system sans serif body copy. Preserve the exact supplied covers. The distinctive motif is a fine circular orbit around the book presentation, echoing the cover without adding anatomical imagery. No generated media is needed.

## Page and actions

Header → outcome-led hero with price and planner → three practical outcomes → contents → three real sample previews → free planner → main offer with optional companion → FAQs → closing action and footer. Anchors link to actual sections. Sample links work without JavaScript, enhanced to a keyboard-operable native dialog. Native details elements provide FAQs.

Prices and release gates come from `product.config.json`; copy comes from `src/content.mjs`. Preview selection is transient and unchecked initially. A shared pure offer model computes totals and release readiness, requires verified HTTPS Selar destinations, and never routes combined selection to the main checkout. Sales remain closed. Optional urgency is omitted unless complete and verified; expired offers fail closed.

## Source map

- `src/page.mjs`: page and style-tile HTML templates
- `src/content.mjs`: editable editorial content
- `src/styles.css`: shared tokens and responsive layout
- `src/app.js`: progressive interactions
- `src/offer.mjs`: pricing and payment gating
- `scripts/build.mjs`: static HTML plus responsive image generation into `dist/`
- `scripts/serve.mjs`: loopback-only local preview
- `tests/offer.test.mjs`, `tests/browser.mjs`: focused logic and browser checks
- `assets/`: original covers and sample pages, unchanged

At 900px the layout becomes a single column; at 640px the header uses a disclosure menu. Mobile puts the outcome, price and CTA before the main cover. No fixed-height copy boxes, scroll hijacking or sticky purchase bar. Images use 360/640/1080px sources. Essential HTML, pricing and anchors work without JavaScript; the optional selector appears only when enhanced.

## Validation

Run syntax checks, focused offer/deadline tests and production build. Inspect Chromium at 320, 360, 390, 430, 768 and 1440px plus short landscape, text enlargement, reduced motion and JavaScript disabled. Check preview dialog, keyboard focus, menu, FAQs, image requests, console errors, no overflow, and selection totals. Record actual evidence in HANDOFF.md.

Missing launch inputs: recorded clinical/editorial approval, final approved assets, verified checkout/delivery, seller identity, support and policies. These do not block this local design. No deployment is included.
