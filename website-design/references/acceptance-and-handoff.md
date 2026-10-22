# Acceptance and Handoff

## Plan proportionate checks

Use existing relevant code checks and the production build. Validate manifests, frame files/URLs, posters, routes, and source references. Use permitted inspection tools; a successful build does not prove visual quality, smooth motion, or backend functionality.

For a full build or mobile implementation, inspect narrow, typical, tall, and short phones, plus landscape phone, tablet, and desktop. Suggested CSS samples: 320 × 568, 360 × 800, 390 × 844, 430 × 932; add short landscape, about 768 px tablet width, and about 1440 px desktop width. Adapt to the audience; these are samples, not mandatory breakpoints.

Check mobile Safari and Android Chrome where available. Distinguish browser-engine testing, viewport emulation, and physical devices. For a targeted repair, test affected behavior and relevant regressions rather than claiming every full-site check was performed.

For an ordinary website without a cinematic sequence, apply the same checks to its first screen, key sections, and main action; mark sequence-specific checks out of scope. After mobile refinement, explicitly recheck desktop layout, navigation/actions, and media selection. Do not infer desktop success from phone screenshots.

## Acceptance matrix

Record **passed**, **failed**, or **not tested** for each applicable area, with evidence or a concrete limitation. Mark out-of-scope checks explicitly instead of counting them as passed.

| Area | Evidence required |
| --- | --- |
| First impression | Brand, understandable offer, and main action present immediately; appropriate poster/layout without waiting for frames. |
| Composition | Opening, every join, final reveal, and following content inspected at representative sizes; no clipped copy, hidden product, broken branding, seams, exposed edges, or horizontal overflow. |
| Readability | Text enlargement, contrast over moving backgrounds, heading hierarchy, safe areas, and short-screen flow checked. |
| Motion and pacing | Slow, fast, reverse, interrupted scroll, flings, jumps, and direction changes exercised; readable copy holds; no blank flash, wrong chapter, accidental reveal, or broken join. |
| Navigation | Header persists after story; keyboard/focus/Escape/close behavior works; modal behavior matches the pattern; anchors clear header. |
| Actions | Primary CTAs/nav destinations followed; action reachable before story ends; forms/cart/booking checked within authorized scope; demos labeled. Avoid real purchases or person-directed submissions unless separately authorized. |
| Skip and history | Skip reaches/focuses content before media loads and stops prefetch; direct anchors, mid-page reload, Back/Forward, and returning to story work. |
| Responsive lifecycle | Toolbar, orientation, short landscape, breakpoint/variant transitions, and virtual keyboard where relevant checked; progress/position remain coherent. |
| Reduced motion | Preference checked before initialization and during visit; composed still/readable flow, no long pinning spacer, no sequence requests on static first load. |
| Failure and accessibility | Keyboard/focus, alternatives/labels, failed frame, failed initialization, invalid manifest, and JavaScript-disabled fallback checked; content/actions remain usable. |
| Network/resources | Cold load requests only selected sequence; priority, bounded requests/cache, stale-response protection, cleanup checked; skip/variant/offscreen changes stop scheduling. |
| Production | Relevant build/checks pass; routes/assets resolve; no material runtime errors; content, original media, and selected masters retained. |
| Routes and feature states | Direct route entry, refresh, history, and relevant missing routes work; loading/empty/error states remain usable; submission success reflects a confirmed result; input survives recoverable failure. |
| Design consistency | Shared tokens match the implemented site; typography, alignment, image treatment, spacing, and control states remain coherent with real-length copy and text enlargement. |
| Supporting assets | Large images use appropriate sources/dimensions; the first-screen image loads promptly; offscreen assets do not unnecessarily compete; fonts do not clip or hide essential content. |

Inspect actual cold-load requests. CSS hiding does not prove inactive media is not downloaded. Check reduced-motion requests before enabling animation. Verify scheduling stops after skips/variant changes without claiming previously downloaded bytes were removed.

Fix observed failures and rerun affected checks. Once applicable gates pass, stop optional expansion. Never mark a device, browser, or accessibility assessment verified when tools could not perform it.

## Performance evidence

Report separately, by variant where relevant:

| Item | Reporting rule |
| --- | --- |
| Poster size | Actual file/transfer size; identify which was measured. |
| Initial animation transfer | Observed bytes over a defined initial-load window; distinguish configured prefetch from network transfer. |
| Complete sequence size | Sum actual encoded files; distinguish from transfer in a particular visit. |
| Decoded-cache estimate | Dimensions × estimated bytes per pixel × retained frames, with overhead/exclusions; do not call it measured browser memory. |
| Runtime limits | Actual concurrency, prefetch range, cache budget, density cap, sample rate/count, selection rule. |
| Timings | Only collected measurements with test conditions. |

For timings, record browser/version, device/emulation, viewport, cache state, network throttling, CPU settings, and test method. Separate lab results from real-user field data.

Use LCP ≤ 2.5 s, INP ≤ 200 ms, and CLS ≤ 0.1 as source-brief reference targets. Treat field targets as evaluated at the 75th percentile; one local test does not establish a field pass. When advising on current standards/thresholds, verify current primary documentation. Never manufacture a score, substitute an unrelated lab metric for INP, or infer field success from a build.

## Complete the handoff

Provide the functioning website or authorized preview plus available artifacts:

- Shared-token style tile and selected logo masters, accurately labeled by format.
- Original generated/accepted clips and media references, when produced.
- Opening/final-reveal screenshots, when captured.
- Exact editing paths for content, CTAs, tokens, timeline, manifests, and runtime settings; explain how edits reach the published site.
- Compact production note: direction, assumptions, provenance/prompts, selection rule, settings, measured results, and limitations.
- Validation matrix with passed/failed/not-tested evidence.

Explain that mobile and desktop share one website and select appropriate animation assets automatically. State missing footage, unsupported generation operations, unconnected integrations, untested behavior, or blocked deployment directly. A still fallback or demo form is usable progress, not a completed animation or integration.

Use the existing publishing workflow and authorized audience; do not make a private draft public. If deployment fails, provide the runnable project and concrete blocker. Keep secrets and temporary signed URLs out of deliverables. Never claim previews, source files, screenshots, tests, or measurements that were not produced.

Where a preview or deployment is delivered, verify it corresponds to the tested source and recheck essential routes/assets and the primary interaction at that destination when permitted. Separate local validation from delivery-environment checks in the report.
