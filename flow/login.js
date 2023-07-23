const getCaptchaText = require("../utils/inquirer");
const { log, logError } = require("../utils/logger/regular");

async function login(page, data) {
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
    await page.waitForSelector(".loginError:has-text('Invalid Captcha....')", {
      timeout: 3000,
    });
    await page.type('[placeholder="Enter Captcha"]', await getCaptchaText());
    await page.waitForTimeout(8000);
    await page.click("button:has-text('SIGN IN')");
  } catch (error) {
    log("Login Successful");
  }
}

module.exports = login;
