import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { offerState, urgencyState, validCheckout } from '../src/offer.mjs';
const draft = JSON.parse(await readFile(new URL('../product.config.json', import.meta.url), 'utf8'));
function approved() {
  const c = structuredClone(draft);
  delete c.release.checkoutApproval;
  Object.assign(c.release, { salesEnabled: true, publicationStatus: 'published', clinicalReviewComplete: true, finalEditorialApproval: true, approvedAssetsReady: true, reviewRecord: 'test fixture' });
  Object.assign(c.seller, { displayName: 'test fixture', supportEmail: 'test@example.com', privacyUrl: '/privacy', termsUrl: '/terms', refundPolicyUrl: '/refunds' });
  Object.assign(c.checkout, { mainUrl: 'https://selar.com/test-main', mainVerified: true, combinedUrl: 'https://selar.com/test-combined', combinedVerified: true, deliveryVerified: true, deliveryCopy: 'test fixture' });
  return c;
}
test('default, explicit add and remove derive accurate totals', () => {
  assert.equal(offerState(draft).total, 3900);
  assert.equal(offerState(draft, true).total, 6800);
  assert.equal(offerState(draft, false).total, 3900);
  assert.equal(offerState(draft).addCompanion, false);
  assert.equal(draft.products.bonus.price, 0);
});
test('publisher can approve the exact main-only draft without inventing clinical approval', () => {
  assert.equal(offerState(draft).canBuy, true);
  assert.equal(offerState(draft).url, draft.checkout.mainUrl);
  assert.equal(draft.release.clinicalReviewComplete, false);
  assert.equal(draft.checkout.deliveryVerified, false);
  assert.equal(offerState(draft).allowSelection, false);
  assert.equal(offerState(draft, true).canBuy, false);
});
test('draft approval does not transfer to another URL, price or unverified destination', () => {
  for (const change of [c => c.checkout.mainUrl = 'https://selar.com/another-product', c => c.products.main.price += 100, c => c.checkout.mainVerified = false, c => c.release.checkoutApproval.approved = false, c => c.release.salesEnabled = false]) {
    const c = structuredClone(draft); change(c); assert.equal(offerState(c).canBuy, false);
  }
});
test('draft never enables payment even with verified URLs', () => {
  const c = approved(); c.release.salesEnabled = false;
  for (const selection of [false, true]) { assert.equal(offerState(c, selection).canBuy, false); assert.equal(offerState(c, selection).url, null); }
});
test('approved main and combined route to their distinct destinations', () => {
  const c = approved();
  assert.equal(offerState(c).url, c.checkout.mainUrl);
  assert.equal(offerState(c, true).url, c.checkout.combinedUrl);
});
test('missing, unverified or reused combined destination blocks combined selection without blocking main', () => {
  for (const url of [null, 'https://selar.com/test-main', 'https://example.com/product']) {
    const c = approved(); c.checkout.combinedUrl = url;
    assert.equal(offerState(c, true).canBuy, false); assert.equal(offerState(c).allowSelection, false); assert.equal(offerState(c).canBuy, true);
  }
  const c = approved(); c.checkout.combinedVerified = false; assert.equal(offerState(c, true).canBuy, false);
});
test('publication, asset, business and delivery conditions each gate sales', () => {
  for (const [group,key,value] of [['release','clinicalReviewComplete',false],['release','approvedAssetsReady',false],['release','finalEditorialApproval',false],['release','reviewRecord',null],['release','publicationStatus','draft_for_clinical_review'],['checkout','deliveryVerified',false],['seller','displayName',null]]) {
    const c = approved(); c[group][key] = value; assert.equal(offerState(c).canBuy, false, key);
  }
});
test('checkout validation rejects unsafe, misleading or incomplete destinations', () => {
  for (const url of ['javascript:alert(1)','http://selar.com/p','https://selar.com.evil.test/p','https://selar.com/','https://user:pass@selar.com/p',null]) assert.equal(validCheckout(url,true),false);
  assert.equal(validCheckout('https://selar.co/p',true),true);
  assert.equal(validCheckout('https://selar.com/p',false),false);
});
test('urgency is absent by default and fails closed for incomplete or expired terms', () => {
  const c = approved();
  assert.equal(urgencyState(c).visible,false);
  c.urgency = { enabled:true, approvedCopy:'Test offer', endsAt:'2027-01-01T12:00:00+01:00', afterExpiry:'Close offer', checkoutTermsVerified:true };
  const before = Date.parse('2027-01-01T10:59:59Z');
  const at = Date.parse('2027-01-01T11:00:00Z');
  assert.equal(urgencyState(c,before).visible,true);
  assert.equal(offerState(c,false,before).canBuy,true);
  assert.equal(urgencyState(c,at).visible,false);
  assert.equal(offerState(c,false,at).canBuy,false);
  c.urgency.endsAt='2027-01-01T12:00:00';
  assert.equal(urgencyState(c,before).expired,true);
});
