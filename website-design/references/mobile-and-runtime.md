# Mobile and Runtime

## Contents

- Responsive composition and viewport behavior
- Persistent navigation
- Opening, reveal, and ordinary content
- Native scroll, skip, and history
- Loading, memory, and variant lifecycle
- Reduced motion and failure recovery

## Responsive composition and viewport behavior

Use one shared website and semantic content structure. Compose mobile independently rather than shrinking desktop or duplicating the full site. Provide dedicated portrait animation for image-sequence experiences, starting near 9:16 and adapting to the actual crop. Reuse suitable assets; disclose a still fallback and missing animation when generation is unavailable.

Define one documented selection rule for layout, posters, preloads, and frame loading. Reuse project breakpoints when suitable and handle tablets and landscape phones explicitly. Choose according to viewport needs rather than device names. Test viewports are not mandatory CSS breakpoints.

Apply responsive source selection to large supporting images as well as posters. Match source sizes and crops to their displayed regions, reserve dimensions, and verify actual requests; hiding a desktop image with CSS does not avoid its transfer. Defer suitable offscreen images without delaying the visible primary image.

Calculate the visible animation region after accounting for header, safe areas, and copy. Record each beat's focal point and subject bounds in normalized coordinates; test the crop at representative aspect ratios. “Keep it centered” is insufficient. Preserve the full product and legible branding at the final reveal. On short screens, allow copy below the visual instead of reducing legibility or clipping the subject.

Use stable viewport measurements, such as small viewport units where suitable, for pinning/scroll ranges that must not jump as toolbars move. Use dynamic sizing where fitting the visible screen matters, such as a navigation overlay. Recalculate on meaningful layout/orientation changes without resetting progress on every toolbar fluctuation. Test virtual-keyboard behavior separately for forms/search.

Reserve media dimensions before loading. Count safe-area insets once per relevant calculation. Fix horizontal overflow at its cause rather than masking clipped content. Check fixed/sticky behavior against ancestor transforms, containment, and overflow.

## Persistent navigation

Keep a compact branded header fixed above the story and every following section. Place brand symbol/wordmark left and an accessible menu button right. Mount it outside pinned sections and ancestors that constrain fixed positioning. Use deliberate stacking, a contrasting background, and targets at least 44 × 44 CSS pixels as the design target.

Use semantic links/buttons, an accessible toggle name, expanded state, visible focus, and a close control. Do not assign application-style ARIA menu roles to ordinary site navigation.

| Pattern | Required behavior |
| --- | --- |
| Disclosure panel | Preserve normal document focus behavior; do not impose modal focus trapping. |
| Modal overlay | Move focus inside, contain keyboard focus, make background content inactive, and lock background scroll while preserving page position. |

Support keyboard use and Escape. Close after link selection. Return focus to the trigger on dismissal; for same-page navigation, focus the destination appropriately. Offset anchors using the actual occupied header height, including safe-area padding already applied, without counting it twice.

## Opening, reveal, and ordinary content

Open with the persistent header, one short headline, one primary action, and a subtle scroll cue. Keep a separate discoverable **Skip animation** link while the story is active. Make the primary action reachable without completing the story.

Place essential copy in selectable HTML within planned negative space. Maintain contrast over all backgrounds and support text enlargement. Minimize decorative labels and secondary overlays during movement while retaining navigation and skipping. Do not bake text/buttons into frames.

At the final reveal, show the whole product with legible identity, concise copy, and the main action. Use product-above-copy where it fits and normal vertical flow elsewhere. Expose the same essential information/action outside the animated presentation; the story must never be the only way to understand or buy the offering.

Synchronize timed overlays from shared timeline data. Prevent invisible controls from taking focus or pointer input. Retain a readable accessible alternative. For an object-following label, implement tracking or deliberate position keyframes rather than a static overlay.

## Native scroll, skip, and history

Preserve ordinary scrolling in both directions and pinch zoom. Do not intercept touch/wheel input to force gestures or require a fixed number of swipes. Tune mobile travel separately while preserving the story. Compress dead intervals, keep purposeful reading holds, and adjust mapping before sacrificing frame density.

Skip animation must work before media loads: reach and focus main content immediately, stop unnecessary story prefetch/rendering, and resume only when the visitor returns to the story. Do not make skipping depend on canvas initialization. Implement a real anchor path that also works without JavaScript.

Handle direct anchors, mid-page refresh, and Back/Forward restoration without resetting to the opening. Preserve the corresponding beat and progress through meaningful responsive changes. Ensure failed-animation cleanup or removal of pinning space does not strand the visitor or focus hidden content.

## Loading, memory, and variant lifecycle

Render usable HTML and the responsive poster in initial output. Prioritize the visible hero poster; do not lazy-load it or wait for all frames. Reserve dimensions to prevent layout shifts.

Before scheduling sequence requests or preloads, select the active variant and check reduced motion. A fresh page requests only the chosen portrait or landscape sequence. Do not download both and hide one with CSS. Do not preload animation in a static reduced-motion presentation.

Keep dimensions/counts, sampling, concurrency, directional prefetch, decoded-cache budget, retry count, and canvas density configuration together. Document settings and tune the sample; do not invent measured memory/performance results.

- Prioritize poster/current frame, then nearby frames according to direction and capacity. Replace obsolete priorities on fast jumps/reversals.
- Limit concurrent network requests and decoded-frame memory independently. Do not retain every transferred frame in decoded form.
- Estimate decoded storage from dimensions and bytes per pixel. At four bytes per pixel, 720 × 1280 is about 3.52 MiB; thirty frames are about 105.5 MiB before overhead. Label this an estimate, not measured browser memory.
- Evict distant frames, close supported ImageBitmaps, revoke obsolete object URLs, and bound backing-store device-pixel ratio to useful visible quality.
- Draw on demand with requestAnimationFrame. Skip unchanged frames/sizes, avoid full component-tree renders on scroll, and minimize repeated layout reads/writes.
- If a requested frame is missing, retain a useful decoded frame or poster and prioritize the new request. Do not blank the stage or finish obsolete work first.
- Suspend unnecessary rendering/prefetch when offscreen or the document is hidden. Clean up listeners, observers, requests, timers, and graphics resources on teardown.

On variant changes, cancel cancellable requests and reject stale asynchronous results using a generation/variant identity. Preserve the stable beat and local progress, remap to the new timeline, and release old resources after a safe visual handoff. Different frame counts require remapping, not reuse of a raw frame number.

Prevent late responses from replacing a newer requested frame even within the same variant. Keep cache acceptance separate from eligibility to draw. Cancellation prevents unnecessary future work; it cannot undo transferred bytes.

## Reduced motion and failure recovery

For reduced motion, use a composed still and normal flow, expose chapters in readable order, and remove animation-only pinned travel. Fetch no animation sequence for that presentation. Respond to preference changes during a visit, stopping scheduling and clearing obsolete work as needed.

Keep the site usable with JavaScript disabled, failed initialization, invalid/empty manifests, or failed frame requests. Use bounded retries; if animation cannot recover, retain poster, navigation, content, and actions. Remove animation-only space with a safe position/focus handoff rather than stranding the visitor.

Offer appropriate constrained-device alternatives without assuming device class from a name. Maintain contrast, visible focus, meaningful image alternatives, and labeled controls. Never require motion to convey essential information or access the main action.

After mobile changes, recheck desktop opening, story joins/reveal when present, following content, navigation/actions, and cold-load asset choice. Keep one responsive project and demonstrate both views when previews are available.
