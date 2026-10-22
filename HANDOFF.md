# Know Your Cycle — design handoff

Completed as a local draft on 22 October 2026. The publisher subsequently confirmed the price and approved enabling the main-guide Selar link. Checkout is now enabled locally for that exact main product at ₦3,900. No deployment or purchase was performed. This commercial approval is separate from clinical review, which remains unconfirmed and visibly disclosed.

## Open and edit

Run `npm.cmd run build`, then `npm.cmd run dev` and open http://127.0.0.1:4173/. The style tile is at `/style-tile.html`. The server listens only on the local computer. After source changes, rebuild and refresh; there is no automatic reload.

| File | Purpose |
| --- | --- |
| `product.config.json` | Prices, edition counts, original asset paths, publication status, real checkout/business inputs |
| `src/content.mjs` | Outcomes, contents overview, sample captions and FAQs |
| `src/page.mjs` | Semantic page composition, hero/offer/planner copy, shared style tile |
| `src/styles.css` | Shared palette, fonts, spacing, buttons, responsive layout and focus states |
| `src/app.js` | Mobile disclosure, accessible sample viewer and optional companion interaction |
| `src/offer.mjs` | Derived totals, destination validation, release and optional deadline gates |
| `assets/manifest.json` | Provenance, dimensions and draft status of original supplied exports |
| `scripts/build.mjs` | Static generation and smaller image variants |
| `tests/offer.test.mjs` | Targeted offer and deadline checks |
| `tests/browser.mjs` | Chrome viewport, interaction and fallback checks |
| `artifacts/browser-report.json` | Actual browser results, requests and measurement conditions |

`dist/` is generated output; edit source files, not that folder. The site has no production package dependencies, external fonts, tracking, personal-data collection or full paid PDF files. Development tools are locked in `package-lock.json`. Original ZIPs and images are retained.

## Design choices

Warm editorial publishing: plum and ivory with lilac and forest sections, Georgia headings and a system sans serif body. The original book artwork remains unchanged. The orbit wordmark is simple CSS geometry, with a matching SVG favicon; no replacement book artwork was generated.

The shared style tile uses the exact site stylesheet. Key adjustable tokens are at the start of `src/styles.css`: palette, `--width`, `--header` and `--space`. Mobile and desktop are responsive versions of the same page. At 900px the hero and offer become single-column compositions; at 640px the enhanced navigation becomes a disclosure. The hero keeps the outcome, price and action before the cover on mobile.

Images use 360px, 640px and original 1080px WebP sources. The browser selects via `srcset`/`sizes`; the main cover and its companion planner load immediately, while lower images are lazy-loaded. Original images retain their draft labels and proportions. Enlarging a sample loads its original export. Sample links, navigation, prices and native FAQs remain usable without JavaScript.

The current offer links to the publisher-confirmed main guide at ₦3,900, with the planner free. The optional companion is described separately; its add-on control is absent because no combined checkout exists. `release.checkoutApproval` records the publisher's explicit approval of this exact URL/price, without changing clinical, editorial, approved-asset or delivery-verification flags. Draft labels remain visible. Changing the main price or destination invalidates this approval until reconfirmed.

## Validation

| Check | Status / evidence |
| --- | --- |
| Source syntax | Passed: `npm.cmd run check` |
| Focused offer tests | Passed: nine tests, including publisher approval limited to the exact main URL/price, add/remove totals, wrong/missing destinations, release conditions and fixed-time expiry |
| Production build | Passed: HTML/style tile plus six originals and twelve resized variants; original dimensions checked against manifest |
| Dependency audit | Passed: zero reported vulnerabilities after updating Sharp to the patched release |
| Responsive layout | Passed: Chrome emulation at 320×568, 360×800, 390×844, 430×932, 768×1024, 844×390 and 1440×1000; no document-width overflow |
| Keyboard and interactions | Passed: mobile menu Escape/focus return, section focus, sample dialog focus containment/return, FAQ and add/remove totals |
| Fallbacks | Passed: reduced-motion CSS, enlarged body text overflow and JavaScript-disabled content/navigation/pricing |
| Desktop final recheck / network | Passed: desktop navigation/selection, anchor refresh, style tile, 404 behaviour; zero recorded console/page/network errors. Chrome 155.0.8059.84. See `artifacts/browser-report.json`. |
| Physical devices / Safari / Firefox | Not tested; the browser checks use desktop Chrome viewport emulation |
| Screen reader audit | Not tested with assistive-technology software; semantic structure and keyboard behaviour were checked |
| Payment and delivery | Main listing inspected and publisher confirmed the price: https://selar.com/127x1q2k2o. Main checkout enabled by explicit user instruction. Delivered files remain untested; no purchase was made. See `artifacts/checkout-report.json` for local button navigation checks. |
| Enabled main checkout | Passed: 390px and 1440px Chrome checks verified the link, price, draft disclosure and absent combined selector. Button navigation was intercepted locally and matched the supplied Selar URL; no payment was attempted. |
| Cinematic video / sequence checks | Out of scope: this is a static editorial landing page |

Screenshots are in `artifacts/`: full pages by width, desktop opening/closing, mobile opening, enlarged text and style tile. A real visual review caught a cover-caption overlap and a keyboard test caught dialog focus leaving the intended controls; both were repaired before handoff. A later test-selector ambiguity was corrected without changing the page's behaviour.

No Lighthouse score, physical-device result or Core Web Vitals field pass is claimed. At 1440×1000, the final local Chrome navigation recorded 94,564 bytes across six resource requests, excluding the HTML document. The main cover used its 640px variant (48,578 recorded transfer bytes) and the hero planner used 360px (11,144 bytes). This is an unthrottled local measurement, not a production mobile result. The six original exports total 645,328 bytes; the responsive variants avoid transferring those originals for every thumbnail.

## Remaining publication inputs

- Recorded clinical review and final editorial approval, approved assets and reconciled page counts.
- The publisher has confirmed the main price. Delivery remains untested. If offered, supply a distinct combined checkout containing both guides and the free planner at the calculated total. A standalone companion checkout is optional.
- Verified delivery wording, support details and actual privacy, terms and refund policies. The main listing identifies the seller as Tokunbo Akomolede; this name is now saved in the config.
- Explicit publication instruction. The build currently remains unindexed through meta tags, `robots.txt` and preview response headers. These do not provide private hosting access control.

For a fully reviewed final edition, supply the actual release evidence and replace the draft exports. The `published` workflow continues to require the recorded review/delivery/business conditions. The publisher-approved draft path is deliberately limited to the current main URL and price; it does not approve the companion or claim clinical review. The optional urgency component remains absent and closes the offer when configured terms are incomplete or expired. Any actual offer/deadline change requires checkout reconciliation and a fresh deployment.
