const os = require("os");
os.platform() === "win32" ? console.log("\x1Bc") : console.clear();

const { chromium } = require("playwright");
const dotenv = require("dotenv");
const getCaptchaText = require("./utils/inquirer");
const adBlocker = require("./utils/adBlocker");
const networkLogger = require("./utils/logger/network");

const { log, logError } = require("./utils/logger/regular");

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

    // await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("https://www.irctc.co.in/");

    log("Clicking on Login Button");
    await page.click(".loginText");

    log("Clicked on Login Button");
    await page.waitForSelector('[placeholder="User Name"]');

    try {
      await page.waitForLoadState("networkidle");
    } catch (error) {
      logError(error);
    }
    log("Typing username");
    await page.type('[placeholder="User Name"]', data.uid || "");

    log("Typing password");
    await page.type('[placeholder="Password"]', data.password || "");

    await page.click('[placeholder="Enter Captcha"]');

    const captchaText = await getCaptchaText();
    await page.type('[placeholder="Enter Captcha"]', captchaText);

    await page.click("button:has-text('SIGN IN')");

    try {
      await page.waitForSelector(
        ".loginError:has-text('Invalid Captcha....')",
        { timeout: 3000 }
      );
      await page.type('[placeholder="Enter Captcha"]', await getCaptchaText());
      await page.waitForTimeout(8000);
      await page.click("button:has-text('SIGN IN')");
    } catch (error) {
      log("Login Successful");
    }

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
