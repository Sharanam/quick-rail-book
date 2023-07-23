const { PlaywrightBlocker } = require("@cliqz/adblocker-playwright");
const fetch = require("cross-fetch");

async function adBlocker(page) {
  const blocker = await PlaywrightBlocker.fromPrebuiltAdsAndTracking(fetch);
  await blocker.enableBlockingInPage(page);
}

module.exports = adBlocker;
