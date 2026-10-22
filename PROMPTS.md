# Astra 6 prompts for VS Code

Copy the starter files into your project root first. If the project already has AGENTS.md, merge the new product guidance into it without replacing existing instructions. Keep assets/ and product.config.json available to the agent.

Use the prompts below in order. Prompt 1 creates the plan; prompts 2–5 implement and verify it locally. Run prompt 6 only when you have supplied the final publication details and checkout links. No prompt authorizes deployment.

## Prompt 1 — Inspect the project and produce the build plan

```text
Read AGENTS.md, product.config.json, LANDING_PAGE_COPY.md and assets/manifest.json in this project. Inspect existing repository instructions, framework, routes, package manager, scripts, components, assets and working changes.

Plan a premium landing page for Know Your Cycle, the reproductive-health guide for Nigerian women. Main guide: ₦3,900. Optional Planning for Pregnancy companion: ₦2,900. Cycle & Appointment Planner: free with the main guide. Combined total: ₦6,800.

The core outcome is: “Understand your cycle, feel prepared for appointments and know your next step.”

Create BUILD_PLAN.md with the exact route/files to change, section order, visual direction, content/asset mapping, purchase states, mobile behavior and validation plan. Use the existing stack. If the project is empty, choose a small maintainable approach and explain the choice.

Separate confirmed facts from missing publication inputs. Current assets are drafts for clinical review; sales and urgency remain disabled. Do not invent checkout links, reviews, deadlines or endorsements. Missing commercial inputs must not block a complete local preview.

This step is planning only. Do not implement or deploy the page yet. Finish with a concise plan and the next implementation step.
```

## Prompt 2 — Build the premium page locally

```text
Implement the local landing page described in AGENTS.md and BUILD_PLAN.md. Read LANDING_PAGE_COPY.md and product.config.json before coding. Preserve the existing stack and unrelated work.

Use the supplied covers and actual sample pages. Establish shared tokens with deep plum, warm ivory, forest green and restrained gold accents. Use an elegant readable serif for headings and a clean sans serif for body copy, with sensible font fallbacks. Create a strong editorial hero, generous spacing and a deliberate mobile composition. Do not make the page a repeated grid of identical cards.

Build the header, outcome-led hero, practical benefits, guide contents, real preview section, free planner, main offer, optional companion, FAQs and closing CTA. Show the main price at the hero and offer section. Make it clear these are digital PDFs.

Use a reusable content/config layer. Implement the whole reading experience and all internal links. Keep the current draft notice and sales-opening-soon state; do not conceal draft labels in images. Add a keyboard-accessible way to enlarge the sample pages.

Make the page responsive from narrow phones through desktop. Use restrained motion and respect reduced motion. Do not generate new covers, invent testimonials or create an actual checkout backend. Finish the local implementation, run applicable existing checks and tell me how to open the preview. Do not deploy.
```

## Prompt 3 — Implement exact pricing and the optional upsell

```text
Audit and finish the pricing flow using product.config.json as the single source of truth.

Main guide: 3900 NGN.
Optional Planning for Pregnancy: 2900 NGN.
Included planner: 0 NGN.
Calculate the combined total from the two prices: 6800 NGN.

Show ₦3,900 for the main product, ₦2,900 for the optional companion and FREE for the included planner. Never preselect the upsell. If the visitor explicitly adds it, update the itemised total and action label to ₦6,800; removal restores ₦3,900. Make the control keyboard accessible and announce total changes appropriately.

Respect release.salesEnabled and the publication state. In current preview mode, show the selection interaction with checkout clearly unavailable. No payment navigation may occur.

For live mode, use only verified real destinations: checkout.mainUrl for main-only, checkout.combinedUrl for the combined selection. A combined URL must contain both guides plus the planner at the correct price. If a combined destination is not available, do not offer a combined purchase control; use a separately verified companion link only when configured. Do not use query parameters to guess changes to a Selar order.

Add a few meaningful checks for default selection, add/remove totals, missing/wrong destination handling and disabled-sales behavior. Do not create a real purchase. Report any publication inputs still missing.
```

## Prompt 4 — Refine the visual design and mobile experience

```text
Review the implemented page as a senior editorial designer and front-end engineer. Follow AGENTS.md. Inspect the real rendered page if browser tools are available; otherwise clearly state what could not be visually verified.

Improve the first screen so the dream outcome, product, ₦3,900 price and primary action are clear immediately. Preserve the exact cover art. Make the free planner feel useful through its real worksheet preview, and keep the optional ₦2,900 companion distinct.

Refine typography, line lengths, whitespace, button hierarchy, cover scale, image shadows and section transitions. Ensure the design looks intentional on a 360px phone, a 390px phone, a tablet and desktop. Do not add visual clutter, unsupported badges or fabricated social proof.

Check that sample-page enlargement, menus, FAQs, focus states and reduced motion work. Prevent sticky elements from hiding content. Verify no horizontal overflow, clipped headings or unreadable fine print. Optimise image loading without degrading the book-cover text.

Fix the issues you find, then recheck desktop after mobile changes. Record actual checks and limitations. Do not claim a Lighthouse score or physical-device test without running it.
```

## Prompt 5 — Audit the offer, copy and release readiness

```text
Audit the landing page against AGENTS.md, LANDING_PAGE_COPY.md and product.config.json. Fix factual or behavioral inconsistencies.

Confirm:
- Main guide ₦3,900; optional companion ₦2,900; combined ₦6,800; planner free.
- No preselected upsell, invented discount, fake review, unverified reviewer credit, guaranteed pregnancy, rapid-conception promise or diagnosis claim.
- Dream outcome stays educational: understanding, organised records and prepared care conversations.
- Only selected sample pages are public assets; the paid PDFs and private records are not exposed.
- Current draft status is honest. Sales remain disabled until final publication and checkout details are supplied.
- Urgency is off because no genuine deadline has been supplied. Keep a conditional component ready, but do not invent dates, limited PDF stock or resetting timers.
- No health intake form or unrequested advertising/analytics tracking has been added.

Run applicable lint/type/build checks and focused purchase-state tests. If browser tools are available, verify the main interactions and representative phone/tablet/desktop layouts.

Create HANDOFF.md with exact editing paths, how to run locally, checks marked passed/failed/not tested, and a concise list of missing release inputs. Finish a concrete, usable local preview. Do not deploy.
```

## Prompt 6 — Connect the final offer when the real inputs are supplied

Use this only after you have put the final details into product.config.json and replaced draft exports with the approved edition.

```text
Read the updated product.config.json, AGENTS.md and HANDOFF.md. Reconcile the final publication status, page counts, cover/sample assets, seller details, support, actual policies and verified checkout destinations.

Do not infer that review is complete from this prompt alone. Check the supplied release record. If anything required is missing, keep sales disabled, complete all independent changes and list the exact remaining inputs.

For supplied Selar URLs, verify product names, NGN prices and included files without completing a purchase. Wire main-only checkout and, where genuinely available, combined checkout. Test opt-in upsell behavior and accurate total labels.

Enable a genuine offer deadline only if the approved offer text, absolute end timestamp, timezone and after-expiry behavior are all supplied and match checkout. Otherwise keep urgency absent. Do not turn unlimited PDF supply into scarcity.

When all release conditions are supplied and verified, prepare the live-mode configuration locally and rerun affected checks. Remove preview-only notices only when the edition is genuinely final. Do not expose unfinished placeholder text or claim an untested delivery process works.

Finish with a release-readiness report and remaining limitations. Keep deployment as a separate user instruction.
```
