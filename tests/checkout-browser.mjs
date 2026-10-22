import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
const browser = await chromium.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:true });
const results = [];
try {
  for (const width of [390,1440]) {
    const page = await browser.newPage({viewport:{width,height:1000}});
    const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto('http://127.0.0.1:4173/#offer',{waitUntil:'networkidle'});
    const buy=page.locator('#checkout-link');
    assert.equal(await buy.getAttribute('href'),'https://selar.com/127x1q2k2o');
    assert.match(await buy.textContent(),/₦3,900/);
    assert.equal(await page.locator('#add-companion').count(),0);
    assert.equal(await page.locator('.sales-closed').count(),0);
    assert.match(await page.locator('.draft-notice').textContent(),/awaiting clinical review/);
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    await page.locator('.main-offer').screenshot({path:`artifacts/checkout-${width}.png`});
    // Capture only the destination; fulfil locally so the test never enters payment.
    let destination;
    await page.route('https://selar.com/**',route=>{destination=route.request().url();return route.fulfill({status:200,contentType:'text/html',body:'Checkout navigation captured by local test.'});});
    await buy.click();
    await page.waitForURL('https://selar.com/127x1q2k2o');
    assert.equal(destination,'https://selar.com/127x1q2k2o');
    assert.deepEqual(errors,[]);
    results.push({width,status:'passed',destination,externalRequest:'intercepted locally; no payment attempted'});
    await page.close();
  }
  await writeFile('artifacts/checkout-report.json',JSON.stringify(results,null,2));
  console.log(JSON.stringify(results,null,2));
} finally { await browser.close(); }
