const os = require("os");
os.platform() === "win32" ? console.log("\x1Bc") : console.clear();

const { chromium } = require("playwright");
const dotenv = require("dotenv");
const adBlocker = require("./utils/adBlocker");
const networkLogger = require("./utils/logger/network");

const { log, logError } = require("./utils/logger/regular");
const { login, searchTrain } = require("./flow");

dotenv.config(
  process.env.NODE_ENV === "production"
    ? { path: ".env" }
    : { path: "config.env" }
);

async function main({ data, logNetwork = false, blockAds = true }) {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 100,
    timeout: 10000,
  });
  browser.on("disconnected", () => {
    log("Browser Disconnected");
  });

  try {
    const page = await browser.newPage();
    if (blockAds) {
      await adBlocker(page);
    }
    if (logNetwork) {
      networkLogger(page);
    }
    await page.setViewportSize({ width: 1920, height: 1080 });

    await login(page, data);

    await searchTrain(page, data);

    // search train
    // under construction
  } catch (error) {
    logError(error);
  } finally {
    // await browser.close();
  }
}

main({
  logNetwork: true,
  blockAds: true,
  data: {
    uid: process.env.UID,
    password: process.env.PASSWORD,
  },
});
