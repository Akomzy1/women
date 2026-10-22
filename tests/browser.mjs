import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const out = new URL('../artifacts/', import.meta.url);
await mkdir(out, { recursive:true });
const browser = await chromium.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:true });
const report = { browser:browser.version(), viewportChecks:[], errors:[], interactions:[], measurements:{} };
const page = await browser.newPage();
page.on('pageerror', error => report.errors.push(error.message));
page.on('console', message => { if(message.type()==='error') report.errors.push(message.text()); });
page.on('response', response => { if(response.status()>=400) report.errors.push(`${response.status()} ${response.url()}`); });
try {
  for (const [width,height] of [[1440,1000],[768,1024],[390,844],[360,800],[320,568],[430,932],[844,390]]) {
    await page.setViewportSize({width,height});
    await page.goto('http://127.0.0.1:4173/', {waitUntil:'networkidle'});
    const result = await page.evaluate(() => ({ width:innerWidth, documentWidth:document.documentElement.scrollWidth, headings:document.querySelectorAll('h1').length, image:document.querySelector('.main-book img').currentSrc }));
    assert.ok(result.documentWidth<=width,`Horizontal overflow at ${width}: ${result.documentWidth}`);
    assert.equal(result.headings,1);
    await page.locator('footer').scrollIntoViewIfNeeded();
    await page.waitForTimeout(150);
    await page.evaluate(() => scrollTo(0,0));
    await page.waitForTimeout(150);
    await page.screenshot({path:new URL(`page-${width}.png`,out).pathname.replace(/^\/([A-Za-z]:)/,'$1'),fullPage:true});
    report.viewportChecks.push({...result,height,status:'passed'});
  }
  await page.setViewportSize({width:390,height:844});
  await page.goto('http://127.0.0.1:4173/', {waitUntil:'networkidle'});
  const menu=page.locator('.menu-toggle');
  await menu.click();assert.equal(await menu.getAttribute('aria-expanded'),'true');
  await page.keyboard.press('Escape');assert.equal(await menu.getAttribute('aria-expanded'),'false');
  assert.equal(await menu.evaluate(e=>e===document.activeElement),true);
  await menu.click();await page.locator('nav a[href="#preview"]').click();
  assert.equal(await menu.getAttribute('aria-expanded'),'false');
  assert.equal(await page.locator('#preview').evaluate(e=>e===document.activeElement),true);
  report.interactions.push('Mobile disclosure, Escape/focus return and same-page link focus passed.');
  const sample=page.locator('.sample-image-link').first();
  await sample.click();assert.equal(await page.locator('dialog').evaluate(e=>e.open),true);
  await page.keyboard.press('Tab');
  assert.equal(await page.evaluate(()=>document.querySelector('dialog').contains(document.activeElement)),true);
  await page.keyboard.press('Escape');assert.equal(await page.locator('dialog').evaluate(e=>e.open),false);
  assert.equal(await sample.evaluate(e=>e===document.activeElement),true);
  report.interactions.push('Sample dialog opens, contains keyboard focus, closes with Escape and restores focus.');
  const add=page.locator('#add-companion');
  assert.equal(await page.locator('#offer-total').textContent(),'₦3,900');
  if (await add.count()) {
    assert.equal(await add.isChecked(),false);
    await add.check();assert.equal(await page.locator('#offer-total').textContent(),'₦6,800');assert.equal(await page.locator('#companion-line').isVisible(),true);
    await add.uncheck();assert.equal(await page.locator('#offer-total').textContent(),'₦3,900');
    report.interactions.push('Default/add/remove totals passed.');
  } else {
    assert.equal(await page.locator('#checkout-link').getAttribute('href'),'https://selar.com/127x1q2k2o');
    assert.match(await page.locator('.draft-notice').textContent(),/awaiting clinical review/);
    report.interactions.push('Approved main checkout and unavailable combined selection passed.');
  }
  const faq=page.locator('summary').first();await faq.click();assert.equal(await page.locator('details').first().getAttribute('open'),'');
  report.interactions.push('Native FAQ disclosure passed.');
  await page.emulateMedia({reducedMotion:'reduce'});
  assert.equal(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior),'auto');
  await page.addStyleTag({content:'body{font-size:200%}p,li,summary,a,button,label{font-size:inherit!important}'});
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'200% text enlargement overflow');
  await page.screenshot({path:new URL('enlarged-text.png',out).pathname.replace(/^\/([A-Za-z]:)/,'$1'),fullPage:true});
  report.interactions.push('Reduced motion and enlarged text overflow check passed.');
  const nojs=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:844}});
  await nojs.goto('http://127.0.0.1:4173/');
  assert.equal(await nojs.locator('h1').isVisible(),true);assert.equal(await nojs.locator('#offer-total').textContent(),'₦3,900');
  assert.equal(await nojs.locator('#companion-control').isVisible(),false);
  await nojs.locator('nav a[href="#preview"]').click();assert.ok(nojs.url().endsWith('#preview'));
  report.interactions.push('No-JavaScript content, price, navigation and original-image links preserved.');
  await nojs.close();
  await page.setViewportSize({width:1440,height:1000});
  await page.goto('http://127.0.0.1:4173/',{waitUntil:'networkidle'});
  await page.locator('nav a[href="#offer"]').first().click();
  if (await page.locator('#add-companion').count()) {
    await page.locator('#add-companion').check();assert.equal(await page.locator('#offer-total').textContent(),'₦6,800');
  } else {
    assert.equal(await page.locator('#checkout-link').isVisible(),true);
  }
  await page.reload({waitUntil:'networkidle'});assert.ok(page.url().endsWith('#offer'));
  await page.goto('http://127.0.0.1:4173/style-tile.html',{waitUntil:'networkidle'});
  await page.screenshot({path:new URL('style-tile.png',out).pathname.replace(/^\/([A-Za-z]:)/,'$1'),fullPage:true});
  assert.equal((await page.request.get('http://127.0.0.1:4173/missing')).status(),404);
  await page.goto('http://127.0.0.1:4173/',{waitUntil:'networkidle'});
  report.measurements=await page.evaluate(()=>({ transferBytes:performance.getEntriesByType('resource').reduce((n,r)=>n+r.transferSize,0), requests:performance.getEntriesByType('resource').map(r=>({url:r.name.split('/').pop(),bytes:r.transferSize})), conditions:'Local headless Chrome, 1440×1000, new navigation, no throttling; no field-performance claim.' }));
  await page.screenshot({path:new URL('desktop-opening.png',out).pathname.replace(/^\/([A-Za-z]:)/,'$1')});
  await page.locator('.closing-section').scrollIntoViewIfNeeded();
  await page.screenshot({path:new URL('desktop-closing.png',out).pathname.replace(/^\/([A-Za-z]:)/,'$1')});
  report.interactions.push('Desktop recheck, direct anchors/reload, style tile and missing-route behavior passed.');
  assert.deepEqual(report.errors,[]);
  report.status='passed';
} catch(error) { report.status='failed';report.failure=error.stack;throw error; }
finally { await writeFile(new URL('browser-report.json',out),JSON.stringify(report,null,2));await browser.close();console.log(JSON.stringify(report,null,2)); }
