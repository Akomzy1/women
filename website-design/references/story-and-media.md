# Story and Media

## Contents

- Visual Story and scroll pacing
- Timeline and frame mapping
- Production capabilities and budget
- Continuity and inspection
- Frame preparation and manifests

## Visual Story and scroll pacing

Before generating story media, present this table with exactly the three column labels shown. Replace the illustrative content with events and draft copy specific to the business; add scenes only when the narrative needs them.

### Visual Story

| Scene | Visual story | Website copy |
| --- | --- | --- |
| 01 — Introduction | Introduce the central subject and its first movement, leaving planned space for HTML text. | Opening headline, short explanation, and main action. |
| 02 — Progression | Show the next meaningful process, feature, or customer experience. | Specific supporting message and an action only if useful. |
| 03 — Conclusion | Complete the movement with a result, destination, or full product reveal. | Outcome message, essential details, and final action. |

Use a transition row when an origin must disappear, a moving subject must be isolated, and a destination must stay concealed until the reveal. Use “No copy — let the motion lead” where overlays distract. Do not leave all three visible throughout when the story requires a staged reveal. More scroll distance cannot conceal an object already present in the footage.

Explain how scenes connect and when each HTML copy block enters, remains readable, and exits. Place text in negative space without covering essential movement. Allow travel for reading; do not equate seconds of footage with seconds of scrolling.

Follow with a **Scroll pacing** plan for each scene and transition:

- Elements entering/leaving, subject action, and camera behavior.
- Intended composition, text-safe area, focal point, and normalized subject bounds.
- Separate desktop/mobile active travel in viewport heights or equivalent layout units.
- Normal motion, slower progression, or a held source frame.

Give each beat a stable ID. Use one continuous pinned stage when sufficient; use connected clips when action, setting, or composition exceeds what one clip can reliably deliver. Combine scrubbed motion, resting images, and normal sections as appropriate. Do not impose a fixed clip duration or an indefinitely pinned hero. Roughly 6–12 seconds may be an initial clip choice if supported, never a mandatory specification.

In guided work, wait for the requested identity/story checkpoint before story generation. In autonomous work, present the same plan and proceed. Reopen settled choices only for a concrete defect. Prove a representative stage and chapter transition before producing all dependent footage.

## Timeline and frame mapping

Keep project data explicit, editable, and validated. Adapt names to the stack; preserve these concepts:

| Data | Required content |
| --- | --- |
| Shared story | Stable ordered beat IDs, semantic copy/content keys, action references. |
| Variant timeline | Per-beat scroll start and positive active distance; frame start/end; copy visibility ranges; hold behavior; focal point and normalized subject bounding box. |
| Variant media | Actual count/dimensions, filename pattern or URL list, valid poster, source sampling rate. |
| Runtime config | Unified selection rule, canvas density limit, request concurrency, directional prefetch range, decoded-cache budget, bounded retries. |

Calculate active pinned travel separately from visible stage height. Sum active beat distances to obtain total travel; do not consume one viewport of planned motion as stage height. Document the viewport-height basis. Use stable measurements for pinning and update on meaningful layout changes.

Map within the selected beat:

```text
beatProgress = clamp((scrollPosition - beatScrollStart) / beatScrollDistance, 0, 1)
frameIndex = round(frameStart + beatProgress * (frameEnd - frameStart))
frameIndex = clamp(frameIndex, 0, frameCount - 1)
```

Require finite coordinates, positive distances, valid frame indices, valid ordered copy ranges, and intentional gaps/overlaps. Define deterministic boundary ownership, including exact segment boundaries and reverse scrolling. For a hold, use frameStart == frameEnd; for a full-sequence beat, span 0 through frameCount - 1.

Use sufficient intermediate footage for ongoing action. Spreading a few frames over long travel creates stepping, not smooth motion. Extend the source or produce a connected transition when necessary. Tune inactive intervals and segment mapping before reducing frame density. Keep reading holds brief but usable.

Keep source sampling rate independent from browser drawing cadence. Approximately 18 sampled frames per source second is a starting point for some footage, not a browser frame-rate cap or proof of smooth scrubbing. Inspect slow forward/reverse movement, fast flings, jumps, and direction changes.

When switching variants with different frame counts or scroll lengths, preserve the stable beat ID and its local progress, then map to the new variant. Do not reuse a raw frame index across variants.

## Production capabilities and budget

Use the brief's Higgsfield MCP provider subject to current higher-priority tool constraints. Discover callable operations and inspect each live model schema for durations, aspect ratios, resolution, reference roles, and first/last-frame inputs. A connected plugin or written skill does not prove that image/video operations are available. Never promise unsupported controls or silently swap providers.

Respect explicit budgets and retry preferences. Without a more specific limit, start with one candidate per planned scene and at most one targeted corrective regeneration for a failed scene. Reuse acceptable outputs. If a defect persists, simplify within the accepted story or identify the dependency; do not spend indefinitely. Record only quoted or returned costs, never invented estimates. Media authorization does not authorize a subscription purchase or account changes.

Maintain a compact production ledger:

| Scene/variant | Reference files | Prompt and model/settings | Job ID/status | Accepted output | Cost if returned | Correction reason |
| --- | --- | --- | --- | --- | --- | --- |

Retrieve a submitted job before creating a replacement; pending work is not failed work. Continue independent content/layout work during generation. Keep credentials and expiring signed URLs out of reusable records.

Generate key stills first when they resolve composition or identity. Reuse accepted references for related footage. Specify subject/camera action, geometry/materials, lighting, text-safe space, start/end state, and uninterrupted shots unless cuts are deliberate. Keep interface text out of generated pixels.

## Continuity and inspection

Generate dependent clips sequentially:

1. Inspect and accept the preceding clip, choosing the actual outgoing handoff frame.
2. Extract that clean raster frame from the accepted output.
3. Supply the exact frame to the next model's supported starting-frame/reference input.
4. Continue the subject action and camera movement from that visible state.

Carry forward the original identity references and settings. When starting-frame control is unavailable, use supported image-to-video/reference guidance or a compatible model within the user's constraints. Explain the limitation; a reference does not guarantee continuity.

Inspect both still frames and motion around every join. Check identity, geometry, packaging, legible logos/labels, proportions, scale, orientation, materials, palette, lighting, subject position, background, camera direction, speed, and acceleration. Matching endpoints alone cannot guarantee a smooth seam. Do not generate independent disconnected scenes and expect a crossfade to repair them.

Keep environments continuous to every edge, without seams or panels. Maintain coverage during rotations/zooms, preserve macro detail, and test the final crop before full production. Verify the actual requested motion; renderer panning, scaling, or in-plane rotation may supplement footage but cannot substitute for a missing three-dimensional camera orbit.

Inspect representative frames and complete motion with available tools. Correct visible defects before integration. Preserve good assets, align HTML changes with accepted joins, and use consistent dimensions and crop treatment within each variant. Provide landscape and separately composed portrait footage for sequence stories; never stretch landscape media into portrait.

## Frame preparation and manifests

Keep original videos and selected brand masters. Extract browser-ready frames with an available utility into a new staging directory. For example:

```bash
mkdir -p frames-staging
ffmpeg -i input.mp4 -an -vf "fps=18,scale=1280:-2" -c:v libwebp -quality 78 -start_number 0 frames-staging/frame-%04d.webp
```

Adapt values to the source and target variant. Do not upscale low-resolution sources. Tune resolution, source sampling, quality, and count against actual motion and measured transfer sizes; no fixed values are universal. Avoid overwriting an accepted sequence during extraction.

Create manifests from actual files. Record dimensions, frame count, numbering/start index, filename pattern, sampling rate, and a real poster reference. Verify contiguous numbering, consistent dimensions, sizes, reachable references, and first/middle/final frames before integration. Normalize or translate numbering so runtime indices cannot request nonexistent files.

Promote the accepted sequence after inspection. Show the appropriate responsive poster immediately while nearby frames load. Keep missing media explicit; a static fallback preserves usability but does not complete the requested animation.
