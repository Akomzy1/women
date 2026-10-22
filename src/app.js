import { offerState, formatPrice } from './offer.mjs';

const config = JSON.parse(document.querySelector('#product-data').textContent);
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
toggle.hidden = false;
document.documentElement.classList.add('enhanced');
function closeMenu(returnFocus = false) {
  toggle.setAttribute('aria-expanded', 'false');
  nav.classList.remove('is-open');
  if (returnFocus) toggle.focus();
}
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('is-open', open);
});
nav.addEventListener('click', event => {
  const link = event.target.closest('a');
  if (!link) return;
  closeMenu();
  document.querySelector(link.hash)?.focus({ preventScroll: true });
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') closeMenu(true);
});
matchMedia('(min-width: 641px)').addEventListener('change', () => closeMenu());

const dialog = document.querySelector('#sample-dialog');
let sampleTrigger;
if (typeof dialog.showModal === 'function') {
  document.querySelectorAll('[data-sample]').forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    sampleTrigger = link;
    document.querySelector('#sample-title').textContent = link.dataset.title;
    const image = document.querySelector('#dialog-image');
    image.src = link.href;
    image.alt = link.querySelector('img')?.alt || link.dataset.title;
    dialog.showModal();
    document.body.classList.add('dialog-open');
    document.querySelector('.dialog-scroll').scrollTop = 0;
    document.querySelector('.dialog-close').focus();
  }));
  document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  const imageRegion = document.querySelector('.dialog-scroll');
  imageRegion.tabIndex = 0;
  imageRegion.setAttribute('role', 'region');
  imageRegion.setAttribute('aria-label', 'Sample page image, scroll to read');
  dialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const close = document.querySelector('.dialog-close');
    const first = close;
    const last = imageRegion;
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => { document.body.classList.remove('dialog-open'); sampleTrigger?.focus(); });
}

const checkbox = document.querySelector('#add-companion');
if (checkbox) {
  document.querySelector('#companion-control').hidden = false;
  checkbox.checked = false;
  const updateOffer = () => {
    const state = offerState(config, checkbox.checked);
    document.querySelector('#offer-total').textContent = formatPrice(state.total);
    document.querySelector('#companion-line').hidden = !state.addCompanion;
    const link = document.querySelector('#checkout-link');
    if (link && state.canBuy) {
      link.href = state.url;
      link.textContent = `${state.addCompanion ? 'Get both guides + planner' : 'Get Know Your Cycle'} — ${formatPrice(state.total)} ↗`;
    } else if (link) {
      const closed = document.createElement('div');
      closed.className = 'sales-closed';
      closed.textContent = 'Sales opening soon';
      document.querySelector('#checkout-container').replaceChildren(closed);
    }
  };
  checkbox.addEventListener('change', updateOffer);
  window.addEventListener('pageshow', updateOffer);
  updateOffer();
}
