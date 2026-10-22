export function formatPrice(value) {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(value);
}

export function validCheckout(url, verified) {
  if (!verified || typeof url !== 'string') return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' && ['selar.com', 'www.selar.com', 'selar.co', 'www.selar.co'].includes(parsed.hostname) && parsed.pathname !== '/' && !parsed.username && !parsed.password;
  } catch { return false; }
}

export function urgencyState(config, now = Date.now()) {
  const u = config.urgency;
  if (!u?.enabled) return { visible: false, expired: false };
  const complete = u.approvedCopy && u.endsAt && /(?:Z|[+-]\d{2}:\d{2})$/.test(u.endsAt) && Number.isFinite(Date.parse(u.endsAt)) && u.afterExpiry && u.checkoutTermsVerified;
  return { visible: Boolean(complete) && now < Date.parse(u.endsAt), expired: !complete || now >= Date.parse(u.endsAt), copy: u.approvedCopy, endsAt: u.endsAt };
}

export function offerState(config, addCompanion = false, now = Date.now()) {
  const { products: p, release: r, checkout: c, seller: s } = config;
  const total = p.main.price + (addCompanion ? p.upsell.price : 0);
  const approved = r.salesEnabled && r.publicationStatus === 'published' && r.clinicalReviewComplete && r.finalEditorialApproval && r.reviewRecord && r.approvedAssetsReady;
  const businessReady = s.displayName && (s.supportEmail || s.supportUrl) && s.privacyUrl && s.termsUrl && s.refundPolicyUrl;
  const releaseReady = Boolean(approved && businessReady && c.deliveryVerified && c.deliveryCopy && !urgencyState(config, now).expired);
  const mainReady = validCheckout(c.mainUrl, c.mainVerified);
  // A verified flag cannot make one main-only URL a combined checkout.
  const combinedReady = validCheckout(c.combinedUrl, c.combinedVerified) && c.combinedUrl !== c.mainUrl;
  const url = addCompanion ? (combinedReady ? c.combinedUrl : null) : (mainReady ? c.mainUrl : null);
  // The publisher explicitly approved this main-only draft checkout in chat.
  // Record that decision separately from clinical, editorial and delivery verification.
  const approval = r.checkoutApproval;
  const approvedDraftMain = r.salesEnabled && r.publicationStatus === 'draft_for_clinical_review'
    && approval?.approved === true && approval.scope === 'main_only_current_draft'
    && approval.mainUrl === c.mainUrl && approval.price === p.main.price
    && !addCompanion && !urgencyState(config, now).expired;
  const canBuy = Boolean((releaseReady || approvedDraftMain) && url);
  return { total, addCompanion, canBuy, url: canBuy ? url : null, allowSelection: !r.salesEnabled || (releaseReady && combinedReady), standaloneUrl: releaseReady && validCheckout(c.upsellUrl, c.upsellVerified) ? c.upsellUrl : null };
}
