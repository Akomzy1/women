# Know Your Cycle — local landing page

The landing page is implemented. The original starter instructions are retained below for reference.

## Run the design

Requires Node.js 24 or newer. In PowerShell, use `npm.cmd` if execution policy blocks `npm.ps1`.

```powershell
npm.cmd ci
npm.cmd run build
npm.cmd run dev
```

Open **http://127.0.0.1:4173/**. The companion style tile is at **http://127.0.0.1:4173/style-tile.html**. The server binds to this computer only. Rebuild after editing source files, then refresh the page.

```powershell
npm.cmd run check
npm.cmd test
npm.cmd run test:browser
```

Browser checks require the preview server and Chrome at the path in `tests/browser.mjs`. They write screenshots and a report to `artifacts/`.

Edit copy in `src/content.mjs`, page composition in `src/page.mjs`, design tokens in `src/styles.css`, and prices/release settings in `product.config.json`. See `HANDOFF.md` for validation and publication dependencies. `dist/` contains only the generated site and selected image assets. Full paid PDFs are not included.

## Deploy with Vercel

Import `Akomzy1/women`, select the `main` branch and leave the Root Directory at the repository root. `vercel.json` supplies the Other framework preset, `npm ci` install, `npm run build` build and `dist` output directory. `package.json` selects Node.js 24.x. No environment variables are required.

Generated `dist/` files are not committed; Vercel creates them during the build. Only the selected covers and samples are copied into the output. Indexing remains disabled. The main Selar checkout is enabled under the publisher's recorded approval; clinical-review draft labels remain visible.

## Original starter notes

This pack contains the project instructions, copy, prompts, configuration and real visual assets for your landing-page build. It does not contain a finished website.

## Start

1. Unzip the pack.
2. Copy its contents into your website project root — the folder containing your package.json, or the empty folder you intend to use.
3. If AGENTS.md already exists, merge the product guidance into it and preserve the existing instructions. Avoid overwriting existing files with the same names.
4. Open the project in VS Code and select Astra 6 in your coding assistant.
5. Open PROMPTS.md and paste Prompt 1. Then use prompts 2–5 in order to build and verify the local page.
6. Use Prompt 6 after the final edition and real checkout/business details are supplied.

The conventional project-instruction filename is **AGENTS.md**.

## Confirmed offer

| Item | Price |
| --- | --- |
| Know Your Cycle | ₦3,900 |
| Optional Planning for Pregnancy | ₦2,900 |
| Both guides | ₦6,800 |
| Cycle & Appointment Planner with the main guide | FREE |

There is no invented discount or original price. The companion is optional and must never be selected automatically.

## Files

- AGENTS.md — scope, design direction, page plan, pricing rules and acceptance checks.
- PROMPTS.md — six copy-and-paste prompts.
- LANDING_PAGE_COPY.md — ready-to-adapt copy, outcomes, offer and FAQs.
- product.config.json — confirmed prices and editable publication/checkout settings.
- assets/ — three covers and three actual sample pages, with a source manifest.

## Before the page can take payments

The current ebooks and image exports are drafts for clinical review. The config therefore starts with sales disabled and no deadline. Build the complete preview now; after review, update final assets and publication status accurately.

Supply the real main and combined Selar checkout links (or a separate companion link), seller/support details, actual policies and verified delivery information. A ₦6,800 total on a page does not change the contents or price of a Selar checkout.

No deadline has been set. If you later choose a real introductory offer, provide its end date and the actual after-expiry terms. Do not manufacture PDF scarcity.

This pack includes only selected preview pages, not the complete paid PDFs. Keep full product files out of the public website assets.
