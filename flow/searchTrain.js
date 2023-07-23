const { logError, log } = require("../utils/logger/regular");

async function searchTrain(page, data) {
  try {
    log("Started searching for Trains");
    await page.waitForSelector(".h_menu_drop_button_hidden");
  } catch (error) {
    logError(error);
  }
}
module.exports = searchTrain;
