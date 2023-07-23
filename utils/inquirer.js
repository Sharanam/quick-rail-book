const { input } = require("@inquirer/prompts");

async function getCaptchaText() {
  const captchaText = await input({ message: "Enter Captcha" });
  return captchaText || "";
}

module.exports = getCaptchaText;
