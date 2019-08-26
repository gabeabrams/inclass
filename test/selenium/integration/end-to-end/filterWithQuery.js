require('dce-selenium');
const assert = require('assert');

describeS('End-to-End > filterWithQuery', function () {
  itS.only('Simulates a filtering process using search query', async function (driver) {
    await driver.launchAppStore(true);
    // Type into search field
    await driver.waitForElementVisible('#searchfield-input');
    await driver.typeInto('#searchfield-input', 'Grade');
    // Look for the app that was filtered for
    const appExists = await driver.elementExists('#gradeup-appItem');
    // Make sure that the app is still on the page
    assert(appExists, 'GradeUp app is missing after search query');
  });
});
