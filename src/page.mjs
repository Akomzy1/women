import { content } from './content.mjs';
import { formatPrice, offerState, urgencyState } from './offer.mjs';

export const esc = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const arrow = '<span aria-hidden="true">↗</span>';
const mark = '<span class="brand-mark" aria-hidden="true"><i></i><i></i></span>';
function img(name, alt, className = '', priority = false, sizes = '(max-width: 640px) 88vw, 360px') {
  return `<img class="${className}" src="/assets/${name}.webp" srcset="/assets/${name}-360.webp 360w, /assets/${name}-640.webp 640w, /assets/${name}.webp 1080w" sizes="${sizes}" width="1080" height="1512" alt="${esc(alt)}" ${priority ? 'fetchpriority="high" loading="eager"' : 'loading="lazy"'} decoding="async">`;
}
function head(title, description, indexing = false) {
  return `<!doctype html><html lang="en-NG"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="${indexing ? 'index,follow' : 'noindex,nofollow'}"><meta name="theme-color" content="#3C1635"><title>${esc(title)}</title><meta name="description" content="${esc(description)}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:type" content="website"><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/styles.css"></head>`;
}

export function renderPage(config) {
  const p = config.products;
  const price = formatPrice(p.main.price);
  const upsell = formatPrice(p.upsell.price);
  const state = offerState(config);
  const draft = !state.canBuy;
  const draftEdition = !config.release.clinicalReviewComplete || !config.release.approvedAssetsReady;
  const urgency = urgencyState(config);
  const placeholders = { mainPages: p.main.pageCount, bonusPages: p.bonus.pageCount, upsellPrice: upsell, total: formatPrice(p.main.price + p.upsell.price) };
  const faqs = content.faqs.map(([q, a]) => [q, a.replace(/\{(\w+)\}/g, (_, k) => placeholders[k])]);
  return `${head('Know Your Cycle — A little clarity. A more confident you.', content.description, config.release.allowIndexing && state.canBuy)}
<body>
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header"><div class="header-inner">
  <a class="brand" href="#main" aria-label="Know Your Cycle home">${mark}<span>Know Your Cycle<span class="brand-caption">UNDERSTAND. RECORD. PREPARE.</span></span></a>
  <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="navigation" hidden>Menu <span aria-hidden="true">☰</span></button>
  <nav id="navigation" aria-label="Main navigation"><a href="#inside">Inside the guide</a><a href="#preview">Preview</a><a href="#offer">Price</a><a href="#faqs">FAQs</a><a class="button button-small" href="#offer">See what's included ${arrow}</a></nav>
</div></header>
<main id="main" tabindex="-1">
<section class="hero wrap" aria-labelledby="hero-heading">
  <div class="hero-copy">
    <p class="eyebrow"><span class="short-rule"></span> A LITTLE KNOWLEDGE. MORE CLARITY.</p>
    <h1 id="hero-heading">Your cycle.<br>Your questions.<br><em>A clearer next step.</em></h1>
    <p class="hero-description">An illustrated guide to understanding your cycle, noticing your patterns and feeling more prepared for your next care conversation.</p>
    <p class="audience">Made for adult Nigerian women. Read at your own pace.</p>
    <div class="hero-price"><strong>${price}</strong><span>Includes your <b>free</b><br>Cycle &amp; Appointment Planner</span></div>
    <div class="hero-actions"><a class="button" href="#offer">See what's included ${arrow}</a><a class="text-link" href="#preview">Take a look inside <span aria-hidden="true">↓</span></a></div>
    <p class="format-note"><span aria-hidden="true">▤</span> Digital PDF <span>·</span> ${p.main.pageCount} illustrated pages <span>·</span> Yours to revisit</p>
  </div>
  <div class="hero-art">
    <div class="orbit orbit-one" aria-hidden="true"></div><div class="orbit orbit-two" aria-hidden="true"></div>
    <span class="art-note note-top">A guide to come back to.</span>
    <div class="main-book">${img('know-your-cycle-cover', 'Know Your Cycle — illustrated menstrual health guide, draft for clinical review', '', true, '(max-width: 900px) 65vw, 390px')}</div>
    <div class="bonus-book">${img('cycle-planner-cover', 'Cycle & Appointment Planner — included free, draft cover', '', true, '(max-width: 900px) 29vw, 175px')}</div>
    <div class="bonus-caption"><span class="small-star" aria-hidden="true">✳</span><span>A little help putting<br>it all into practice.<b>YOUR FREE PLANNER</b></span></div>
    <p class="digital-label">THE GUIDES ARE DIGITAL. THE CLARITY IS YOURS.</p>
  </div>
</section>
${draftEdition ? `<div class="draft-notice"><span class="notice-dot" aria-hidden="true"></span><p><strong>${state.canBuy ? 'Draft edition.' : 'A look at what’s coming.'}</strong> This edition is awaiting clinical review.${state.canBuy ? '' : ' Sales are not open yet.'}</p><a href="#preview">Explore the preview <span aria-hidden="true">↗</span></a></div>` : ''}
<section class="outcomes wrap section" aria-labelledby="outcomes-heading">
  <div class="section-intro"><p class="eyebrow">SMALL STEPS. USEFUL UNDERSTANDING.</p><h2 id="outcomes-heading">Clarity about your cycle.<br><em>Confidence in your next conversation.</em></h2></div>
  <div class="outcome-grid">${content.outcomes.map(([n, title, text]) => `<article><span class="section-number">${n}</span><h3>${title}</h3><p>${text}</p></article>`).join('')}</div>
</section>
<section id="inside" class="inside-section section" aria-labelledby="inside-heading" tabindex="-1"><div class="wrap inside-grid">
  <div class="inside-heading"><p class="eyebrow">INSIDE KNOW YOUR CYCLE</p><h2 id="inside-heading">Less wondering.<br><em>More understanding.</em></h2><p>A clear place to start, and a reference to return to. ${p.main.pageCount} illustrated pages that help make unfamiliar topics feel more approachable.</p><a class="text-link" href="#preview">Read a few sample pages ${arrow}</a><span class="editorial-seal" aria-hidden="true">A guide.<br>A record.<br><em>A next step.</em></span></div>
  <div class="chapter-list">${content.chapters.map(([title, text], i) => `<article><span class="chapter-index">0${i + 1}</span><div><h3>${title}</h3><p>${text}</p></div></article>`).join('')}<p class="education-note">For understanding and preparation. This guide does not identify the cause of an individual’s symptoms.</p></div>
</div></section>
<section id="preview" class="preview-section wrap section" aria-labelledby="preview-heading" tabindex="-1">
  <div class="section-heading-row"><div><p class="eyebrow">OPEN A FEW PAGES</p><h2 id="preview-heading">Real pages.<br><em>Practical starting points.</em></h2></div><p>Take a closer look at the guide and planner.<br>These are actual pages from the draft edition.</p></div>
  <div class="sample-grid">${content.samples.map(([file, label, title, text, alt]) => `<article class="sample-card"><a class="sample-image-link" href="/assets/${file}.webp" data-sample data-title="${esc(title)}" aria-label="View sample page: ${esc(title)}"><div class="sample-mat">${img(file, alt)}<span class="sample-expand" aria-hidden="true">↗</span></div></a><p class="eyebrow">${label}</p><h3>${title}</h3><p>${text}</p><a class="text-link" href="/assets/${file}.webp" data-sample data-title="${esc(title)}">View sample page ${arrow}</a></article>`).join('')}</div>
</section>
<section class="planner-section" aria-labelledby="planner-heading"><div class="wrap planner-grid">
  <div class="planner-art"><div class="planner-cover">${img('cycle-planner-cover', 'Cycle & Appointment Planner cover, draft edition', '', false, '(max-width: 640px) 52vw, 260px')}</div><div class="planner-sheet">${img('sample-appointment-planner', 'Blank appointment preparation worksheet from the included planner', '', false, '(max-width: 640px) 45vw, 235px')}</div><span class="planner-art-caption">YOUR THOUGHTS. A LITTLE MORE ORGANISED.</span></div>
  <div class="planner-copy"><p class="eyebrow light-eyebrow">A PRACTICAL LITTLE EXTRA · INCLUDED FREE</p><h2 id="planner-heading">Make space for<br><em>what matters to you.</em></h2><p>The Cycle &amp; Appointment Planner helps you put what you read into practice. A place for dates, observations and the questions you don’t want to forget.</p><ul class="simple-checks"><li>${p.bonus.pageCount} pages for your own records</li><li>Print it, or fill it in with a compatible PDF reader</li><li>Keep it private. Share with your clinician if you choose.</li></ul><a class="text-link light-link" href="/assets/sample-appointment-planner.webp" data-sample data-title="Your appointment worksheet">See the planner in action ${arrow}</a></div>
</div></section>
<section id="offer" class="offer-section wrap section" aria-labelledby="offer-heading" tabindex="-1">
  <div class="section-intro"><p class="eyebrow">YOUR NEXT STEP STARTS HERE</p><h2 id="offer-heading">A guide for you.<br><em>A little clarity to keep.</em></h2><p>Start with Know Your Cycle. Add the companion only if it’s right for you.</p></div>
  <div class="offer-grid">
    <div class="main-offer"><div class="offer-title"><div><p class="eyebrow">THE MAIN GUIDE + YOUR FREE PLANNER</p><h3>Know Your Cycle</h3></div><span class="offer-flower" aria-hidden="true">✳</span></div><p class="large-price">${price}<span>one-time price</span></p><ul class="offer-inclusions"><li><span>Know Your Cycle<small>${p.main.pageCount}-page illustrated PDF</small></span><b>${price}</b></li><li><span>Cycle &amp; Appointment Planner<small>${p.bonus.pageCount}-page printable &amp; fillable PDF</small></span><b class="free-label">FREE</b></li><li id="companion-line" hidden><span>Planning for Pregnancy<small>${p.upsell.pageCount}-page educational PDF</small></span><b>${upsell}</b></li></ul><div class="total-row"><span>Your total</span><strong id="offer-total" aria-live="polite" aria-atomic="true">${price}</strong></div>${urgency.visible ? `<p class="offer-note">${esc(urgency.copy)} Ends ${esc(new Intl.DateTimeFormat('en-GB', {dateStyle:'long', timeStyle:'short', timeZone:'Africa/Lagos'}).format(new Date(urgency.endsAt)))} (Lagos time).</p>` : ''}<div id="checkout-container">${state.canBuy ? `<a class="button full-width" id="checkout-link" href="${esc(state.url)}">Get Know Your Cycle — ${price} ${arrow}</a>` : '<div class="sales-closed" role="status"><span class="notice-dot" aria-hidden="true"></span>Sales opening soon</div>'}</div><p class="offer-footnote">${draft ? 'This edition is awaiting clinical review. Explore the contents and sample pages while we prepare.' : esc(config.checkout.deliveryVerified && config.checkout.deliveryCopy ? config.checkout.deliveryCopy : 'Continue to checkout on Selar. This edition is awaiting clinical review.')}</p><p class="digital-note">Digital PDFs. No physical book is shipped.</p></div>
    <aside class="companion-offer" aria-labelledby="companion-heading"><div class="companion-top"><p class="eyebrow">AN OPTIONAL COMPANION</p><span>FOR YOUR NEXT CHAPTER</span></div><div class="companion-body"><div class="companion-cover">${img('planning-for-pregnancy-cover', 'Planning for Pregnancy cover, draft for clinical review', '', false, '(max-width: 640px) 36vw, 170px')}</div><div><h3 id="companion-heading">Planning for<br><em>Pregnancy</em></h3><p class="companion-price">${upsell}<span>${p.upsell.pageCount}-page PDF</span></p></div></div><p>Thinking about pregnancy? Prepare for care conversations with clearer information about preparation, assessment, treatment options and costs.</p><p class="companion-limit">The main guide is useful on its own. This companion does not promise pregnancy or replace individual care.</p>${state.allowSelection ? `<label class="companion-select" id="companion-control" hidden><input type="checkbox" id="add-companion"><span>Add Planning for Pregnancy<small>+ ${upsell} to your total${draft ? ' · preview only' : ''}</small></span><span aria-hidden="true">+</span></label>` : state.standaloneUrl ? `<a class="text-link" href="${esc(state.standaloneUrl)}">Get the companion — ${upsell} ${arrow}</a>` : ''}</aside>
  </div>
</section>
<section id="faqs" class="faq-section section" aria-labelledby="faq-heading" tabindex="-1"><div class="wrap faq-grid"><div><p class="eyebrow">A FEW THINGS YOU MIGHT WONDER</p><h2 id="faq-heading">Good questions.<br><em>Clear answers.</em></h2><p>A little more detail, so you know<br>what to expect.</p></div><div class="faq-list">${faqs.map(([q, a]) => `<details><summary>${esc(q)}<span aria-hidden="true">+</span></summary><p>${esc(a)}</p></details>`).join('')}</div></div></section>
<section class="closing-section wrap"><span class="closing-mark" aria-hidden="true">✳</span><p class="eyebrow">UNDERSTAND. RECORD. PREPARE.</p><h2>Understand more.<br><em>Take your next step with clarity.</em></h2><p>Know Your Cycle + your free planner. ${price}.</p><a class="button" href="#offer">${draft ? 'Explore the guide' : 'See your options'} ${arrow}</a></section>
</main>
<footer class="site-footer"><div class="wrap footer-top"><a class="brand" href="#main">${mark}<span>Know Your Cycle</span></a><p>Clarity about your cycle.<br>Confidence in your next conversation.</p><a class="text-link" href="#main">Back to top ↑</a></div><div class="wrap footer-bottom"><p>Educational information only. These guides do not replace individual medical advice, diagnosis or treatment.</p><div>${config.seller.displayName ? `<span>${esc(config.seller.displayName)}</span>` : '<span>Made for understanding.</span>'}${[['supportUrl','Support'],['privacyUrl','Privacy'],['termsUrl','Terms'],['refundPolicyUrl','Refund policy']].filter(([key]) => config.seller[key]).map(([key,label]) => `<a href="${esc(config.seller[key])}">${label}</a>`).join('')}</div></div></footer>
<dialog id="sample-dialog" aria-labelledby="sample-title"><div class="dialog-bar"><div><p class="eyebrow">DRAFT EDITION · SAMPLE PAGE</p><h2 id="sample-title">Sample page</h2></div><button type="button" class="dialog-close" aria-label="Close sample preview">Close <span aria-hidden="true">×</span></button></div><div class="dialog-scroll"><img id="dialog-image" alt="" width="1080" height="1512"></div></dialog>
<script type="application/json" id="product-data">${JSON.stringify(config).replace(/</g, '\\u003c')}</script><script type="module" src="/app.js"></script>
</body></html>`;
}

export function renderStyleTile() {
  return `${head('Know Your Cycle — design direction', 'Shared visual design tokens and components.')}<body class="style-tile"><main class="wrap section"><a class="text-link" href="/">← Back to the page</a><p class="eyebrow">KNOW YOUR CYCLE / VISUAL DIRECTION</p><h1>Warm. Thoughtful.<br><em>Made for understanding.</em></h1><p class="tile-description">Editorial publishing, generous space, expressive serif headings and clear sans serif body copy. Original product artwork carries the visual identity.</p><div class="swatches">${[['Plum','#3C1635'],['Ivory','#FBF7F0'],['Forest','#183E35'],['Lilac','#EEE5EC'],['Gold','#A98648']].map(([name,color]) => `<div><span style="background:${color}"></span><b>${name}</b><small>${color}</small></div>`).join('')}</div><div class="tile-grid"><div><p class="eyebrow">TYPE & ACTION</p><h2>Your questions.<br><em>A clearer next step.</em></h2><p>Georgia / system serif headings. System sans serif body copy. Readable immediately, with no external font requests.</p><a class="button" href="/#offer">See what's included ${arrow}</a><a class="text-link" href="/#preview">Take a look inside ${arrow}</a></div><article class="tile-book">${img('know-your-cycle-cover','Original Know Your Cycle cover')}<p>Original artwork. Full cover, soft shadow, no retouching.</p></article></div></main></body></html>`;
}
