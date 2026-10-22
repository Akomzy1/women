# Know Your Cycle — landing-page project instructions

## Scope and working mode

These instructions guide Astra 6 or another coding agent working in the user's VS Code project. Build a premium, responsive landing page locally when the user runs the build prompts. This starter pack is a brief, content and assets; it is not an implemented website.

Read `product.config.json`, `LANDING_PAGE_COPY.md`, `assets/manifest.json` and the existing repository instructions before editing. Inspect the repository's framework, routes, package manager, scripts, components and working changes. Preserve its established stack and unrelated edits. If a root AGENTS.md already exists, merge this product-specific guidance without discarding its instructions.

Use the existing landing-page route. For an empty project, choose a small maintainable stack suited to one page; avoid a backend, CMS, account system or component library unless needed. Do not change frameworks just to follow a preference. Work autonomously on reversible implementation and local checks. Do not deploy, charge a card, send messages, buy services or make a real test purchase without a separate user instruction.

## Product truth and price

The current task concerns the reproductive-health bundle, not the earlier AI or relocation products.

| Item | Role | Current edition | Price |
| --- | --- | --- | --- |
| Know Your Cycle | Main illustrated guide for adult Nigerian women | 28-page PDF | ₦3,900 |
| Planning for Pregnancy | Optional educational companion | 23-page PDF | ₦2,900 |
| Cycle & Appointment Planner | Bonus included with the main guide | 10-page printable and fillable PDF | FREE |
| Both guides + planner | Main plus optional companion | Three PDFs | ₦6,800 |

The bundle total is addition, not a discount. Do not invent an original price, saving, subscription, shipping fee or separate monetary value for the bonus. Describe these as digital PDFs; book-style cover presentation must not suggest physical delivery. The planner has 146 fillable fields in the current draft, but do not use a field count as the main sales claim.

All prices are integer naira in the config, not kobo. Derive totals from the two product prices. Format with `Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 })`. Do not scatter independent price strings across components. When confirmed payment-provider fees apply, explain them before purchase and match the real checkout; do not invent fees.

## Audience, promise and content boundaries

Audience: adult Nigerian women seeking understandable menstrual-health education. Pregnancy planning is optional and must not be assumed to be everyone's goal.

Primary dream outcome: **Understand your cycle, feel prepared for appointments and know your next step.**

Supporting expression: **Clarity about your cycle. Confidence in your next conversation.**

The guide offers education, practical record keeping and appointment preparation. It does not diagnose, treat, restore fertility, balance hormones, guarantee pain relief or promise pregnancy within a set time. The companion explains preparation and care conversations, not a shortcut to conception.

Use calm, respectful language. Avoid telling the visitor that she has a condition, is infertile, is running out of time or is failing her partner. Avoid scare tactics, shame, sensational case stories or implying that buying should precede seeking care. Keep medical information on the landing page at the level needed to explain the contents. If adding a clinical claim, verify it using current primary clinical sources and obtain appropriate content review.

Use `LANDING_PAGE_COPY.md` as the editorial starting point. Improve clarity without expanding factual claims. Do not invent author qualifications, testimonials, customer counts, endorsements, press logos, reviews, treatment success rates or advertising-platform approval. Institutional sources in the books do not imply institutional endorsement.

## Current publication state

The provided PDFs, covers and samples are **drafts for clinical review**. Clinical review and final publication approval have not been recorded. Preserve this status. Never remove draft labels from images to make them appear approved.

Develop a complete local preview with visible pricing. By default `release.salesEnabled` is false. Use “See what's included” links to the offer and a clear “Sales opening soon” state in the purchase area. Display a restrained draft-preview notice. Do not show a functioning payment button or simulate a successful purchase while sales are disabled.

Prepare launch-mode components now. Activate them only when the publisher supplies the final publication status, approved assets, genuine checkout destinations and business information. Record the status accurately; do not mark review complete yourself. This is not an instruction to delay independent design and implementation.

Keep the preview unindexed. An indexing preference is not access control; do not publicly deploy the draft as a workaround.

## Page narrative and sections

Build one focused page in this order, adapting spacing and grouping to the existing project:

1. Compact header: “Know Your Cycle” text wordmark, links to Inside the guide, Preview, Price and FAQs. A primary link scrolls to the offer.
2. Hero: outcome-led H1, brief explanatory copy, main cover prominent, main price ₦3,900, free planner mention, clear CTA and a secondary sample-page link.
3. Practical outcomes: understand cycle language; keep a useful record; prepare clearer questions. Use concrete actions rather than promises of improved clinical outcomes.
4. Inside the main guide: a readable contents overview. Avoid a wall of tiny checklist text.
5. Real preview: three supplied sample images with captions and accessible enlarged views. Retain their draft status in preview mode; replace with the final approved edition for launch.
6. Included bonus: explain the printable/fillable planner and show its real cover or blank worksheet.
7. Main offer: what ₦3,900 includes, exact format, free bonus and purchase summary.
8. Optional companion: explain who might find Planning for Pregnancy useful; show its cover and ₦2,900 price. Make the main guide useful on its own.
9. FAQs: file type, contents, optional upsell, limits of the guide, planner use and delivery once verified.
10. Closing outcome/CTA and a compact footer with confirmed support and policy links.

The offer section can combine steps 7 and 8 if this makes the decision clearer. Keep the main product visually dominant. Do not add a second competing lead-generation funnel.

## Premium visual direction

Mood: calm editorial publishing, warm, credible and distinctly designed. Preserve the supplied cover artwork and exact titles. Build hierarchy with typography, spacing and composition, not badges and exaggerated claims.

Suggested tokens, adjustable for accessible contrast:
- Plum: #3C1635 — main brand surface and strong type.
- Forest: #183E35 — optional companion accent.
- Ivory: #FBF7F0 — main page background.
- Ink: #251F26 — body text.
- Muted gold: #A98648 — small decorative rules and accents, not small body text.
- Soft lilac: #EEE5EC — quiet supporting surface.
- White: #FFFFFF.

Use a readable serif such as Noto Serif for headings and a clean sans serif such as Rubik for body text, preferably using existing licensed/local fonts. Use fallbacks if unavailable. Do not let fonts delay readable content.

Prefer an asymmetric desktop hero, generous margins, large cover presentation, quiet paper-like surfaces and alternating section density. On mobile, lead with the outcome, price and action, followed by a readable cover. Do not shrink the entire desktop design. Use approximately 16–18px body copy, comfortable line height, 44px minimum touch targets and a disciplined spacing scale.

Use subtle hover and entrance effects only where they help. Respect reduced motion. No scroll hijacking, mandatory video, aggressive popups, autoplay sound or distracting confetti. If a sticky mobile offer bar is useful, show it after the initial hero and ensure it does not cover content, focus or the footer.

Do not generate new anatomical art or redesign the covers for this task. CSS shadows may present an existing cover as a book, but the digital format must stay explicit.

## Pricing and Selar checkout behavior

Read prices and verified URLs from `product.config.json`.

Preferred live flow when both checkout destinations have been verified:
- Main guide selected by default: ₦3,900, planner included free.
- An initially unchecked, clearly labelled option: “Add Planning for Pregnancy — ₦2,900”.
- Total changes to ₦6,800 only after an explicit selection, and returns to ₦3,900 on removal.
- The summary lists the actual items and prices.
- Main-only selection uses `checkout.mainUrl`; combined selection uses `checkout.combinedUrl`.
- The combined checkout must genuinely contain both guides and the bonus at ₦6,800. A client-side total does not alter a Selar product or price.

Never preselect the upsell. Do not use a main-only checkout URL for a combined selection. Do not append guessed parameters to Selar links or fabricate checkout URLs.

If only a main-only checkout exists, keep that route usable after release. Present the companion separately; show a standalone purchase link only if `checkout.upsellUrl` is verified. Do not offer a combined purchase control without a valid combined destination. The standalone companion costs ₦2,900 and does not include the main guide.

In local draft mode you may demonstrate the selection and total calculation, but clearly label checkout unavailable and do not navigate to payment. Any price selection is transient UI state; do not collect symptoms or intimate health details.

Use a real hosted checkout rather than collecting card details on this page. Verify the displayed product, currency, price and delivery contents at each supplied destination. Verification stops before completing a purchase. Handle missing destinations honestly and preserve useful navigation.

## Real urgency and scarcity

The user wants urgency when the commercial offer makes it true. The default is disabled because no deadline or limited service has been supplied.

Build an optional offer-note component driven by `urgency`, but omit it when disabled or incomplete. An approved deadline requires an absolute timestamp with timezone, a plain-language offer description and a truthful after-expiry action. Display time in Africa/Lagos.

Acceptable later example: an actual introductory price ending on a specified date, with the post-deadline price configured and matched to checkout. Another example is a real deadline for an added bonus that will actually cease being included. Do not alter the current free-bonus terms unless the publisher instructs you.

Do not invent dates, savings, limited PDF stock, support slots, recent-purchase notices or resetting countdowns. There is no finite PDF inventory. Do not imply a health outcome becomes less attainable if someone does not purchase today. A dated offer note is generally sufficient; add a countdown only when it serves a genuine configured deadline. On expiry, reconcile the displayed offer and checkout; do not silently extend it.

## Assets and data boundaries

`assets/manifest.json` records source pages, dimensions and suggested alt text. These are actual exports from this project, not invented sample content. Import/copy them to the repository's existing asset location and document any path changes. Preserve aspect ratios and provide responsive sources where useful. Eager-load the hero cover and lazy-load lower-page images. Give images explicit dimensions.

Do not place the complete paid PDFs, manuscripts, fillable health records or private source material in a public web directory. Only the selected covers and sample pages belong on the page. Product delivery should use the configured fulfilment channel.

No health intake form, fertility quiz, symptom tracker account or personal medical data collection is in scope. No analytics or advertising pixels are configured. Do not add them merely because the page will receive Meta ads. If later requested, review the then-current platform requirements and consent needs; never transmit personal health information or free-text health responses.

Do not expose secrets in client code. Do not invent a seller name, address, contact email, refund guarantee or policy. Missing business details can remain in config and the readiness report; do not print template tokens or fake links to visitors.

## Implementation quality

Use semantic HTML, one H1, ordered headings, visible keyboard focus, labelled controls, sufficient contrast, descriptive links and meaningful alt text. Make the sample viewer keyboard operable with Escape to close, a focus trap and focus return; an ordinary full-image link is an acceptable simpler solution.

Essential content and pricing should render without waiting for animation. Keep dependencies light. Preserve native scrolling, text enlargement and pinch zoom. Allow anchor targets to clear a sticky header. Avoid invisible overlays and horizontal overflow.

Use a reusable content/config layer and shared design tokens. Keep user-facing copy free of implementation details such as “configuration,” “integration pending” or “API.” Honest draft wording such as “Sales opening soon” is sufficient.

## Completion and validation

After implementation, use the repository's relevant checks and production build. Test:
- 360px and 390px phones, approximately 768px tablet and 1440px desktop; short/landscape screens where practical.
- Cover fidelity, sample readability, price alignment, no clipped copy and no horizontal overflow.
- Keyboard navigation, focus, enlarged text, reduced motion, menu/FAQ/sample-viewer behavior.
- Main-only ₦3,900; upsell ₦2,900; combined ₦6,800; bonus free; no preselection.
- Wrong/missing checkout URLs, draft mode and live-mode gating.
- Genuine deadline behavior with fixed test timestamps, if enabled.
- Asset loading and console errors. Recheck desktop after mobile edits.

Use targeted tests for purchase logic and any deadline behavior. Do not create tests that simply repeat CSS or content strings. Do not claim browser checks if only a build was run.

Report changes, exact files, checks passed/failed/not tested and remaining publication inputs. Keep the result local unless the user later explicitly requests deployment.
