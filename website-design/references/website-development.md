# Website Development

## Define the smallest complete implementation

Inspect the current project before selecting libraries or structure. Reuse its package manager, lockfile, framework, router, styling, test setup, and deployment process. Do not replace the app for a visual improvement or add a dependency for behavior already supported by the stack. Check current official documentation before using unfamiliar or version-sensitive APIs.

Translate the brief into a compact route-and-action contract. For each implemented page or feature, identify its purpose, editable content source, primary action/destination, required data or endpoint, and relevant loading/success/failure states. A few notes suffice for a small site; use a table when routes or integrations are numerous. Keep speculative features out of scope.

Choose static content, server rendering, or client interaction to match the existing architecture and actual requirements. Make the primary page content available in the initial response where the stack permits. Add progressive enhancement for optional motion. Do not introduce accounts, a CMS, commerce, or a custom backend solely to make a marketing site appear more complete.

Build one representative route through its actual visitor action early. Establish semantic structure, responsive layout, navigation, and content first, then refine its design and reuse proven components. For a cinematic site, also complete the representative story prototype required by the main skill before full media production.

## Construct a coherent visual system

Use the shared design tokens in both the style tile and implementation. Define a small, deliberate set for colors, type, spacing, content widths, corners, borders, shadows, and motion. Reuse existing component conventions and derive responsive rules from content pressure rather than arbitrary device labels.

Make hierarchy observable: a clear first-screen offer and action, readable line lengths, consistent alignment, deliberate section spacing, and image scale suited to the story. Use different compositions when content types need them; avoid filling every section with the same card grid or applying decoration without a purpose. Preserve a supplied design system and keep targeted repairs local.

Use real-length draft content and supplied assets while composing. Check long headings, wrapped navigation, text enlargement, and empty/missing optional fields. Avoid fixed-height text containers that clip real copy. Choose fonts and weights intentionally; load only what the design uses, provide fallbacks, and check layout before and after fonts load.

Inspect the first screen, a representative body section, and the final action at wide and narrow sizes before expanding the pattern. Resolve observed layout problems before adding decorative motion. Keep product identity and readable content stronger than ornamental effects.

## Make interactions complete

Use links for navigation and buttons for actions. Give controls meaningful names and visible keyboard focus. Keep tab order aligned with the visual structure. Match disclosure, dialog, tab, and form semantics to their actual behavior rather than adding ARIA roles decoratively.

For stateful features, implement only the states they require: idle, focused, loading/submitting, empty, success, and recoverable failure. Preserve entered values after failure; identify the affected fields and explain the next useful action. Prevent accidental repeated submission while a request is pending, and restore retry capability after failure. Do not convert a timeout or rejected response into success.

Make navigation destinations, search, filters, accordions, menus, and other in-scope controls work. Remove unnecessary decorative controls or identify a real dependency; never imply a functioning feature with an inert click target. For demos, label their limits and avoid fabricated confirmation messages.

Define what persists and where: component/session state, browser storage, or the authorized backend. Do not describe a local draft as shared or published. Follow the existing integration contract, keep credentials in approved server-side configuration, and validate untrusted input at the receiving boundary. When permissions/accounts are in scope, use the established authorization system rather than treating hidden UI as access control. Do not add those systems to a project that does not need them.

## Deliver assets and code efficiently

Choose appropriately sized assets for the rendered region. Use responsive source selection for large supporting images and posters; use separate crops only where composition needs them. Reserve intrinsic dimensions or aspect ratio, prioritize the visible primary image, and defer offscreen imagery where appropriate. Inspect actual requests instead of assuming file compression proves good loading behavior.

Keep semantic content, reusable presentation, and feature/runtime logic understandable and editable. Centralize shared tokens and configuration while keeping state near its owner. Separate animation scheduling from ordinary interface updates. Avoid duplicate desktop/mobile content models and one monolithic component containing all copy, data fetching, navigation, and frame loading.

Make focused changes that preserve unrelated routes and components. Remove unused dependencies and temporary debug/prototype wiring introduced by the task. Retain useful original assets and provenance. Do not commit credentials, temporary signed URLs, or generated build output unless the existing project explicitly requires that output.

## Verify the visitor journey and release

Run the project's relevant formatting/lint, type, build, and existing tests as available; report missing tooling accurately. Add focused tests when changed behavior has a concrete regression risk, such as state transitions, routing, or timeline boundaries. Do not build a redundant test suite for cosmetic changes.

Exercise the primary journey end to end through its authorized outcome. Check direct route loads, refresh, navigation history, invalid/missing routes where in scope, keyboard operation, responsive behavior, and feature error states. Use mocks or test environments for destructive or person-directed effects unless real actions are explicitly authorized. Record exactly what was exercised.

Inspect rendered screenshots and real interactions; code review and compilation are insufficient to establish visual or functional quality. Compare the intended style tile with the implemented layout, check the console/network where tools permit, repair observed defects, and recheck affected views. After a mobile change, include desktop regression checks.

Use the existing release workflow and retain the audience. Confirm that the delivered preview or deployed version corresponds to the validated source. Recheck essential routes/assets and the primary interaction at that destination where access allows. If the environment blocks a check, record it as not tested. Use the acceptance reference for evidence and the final handoff.
