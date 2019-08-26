require('dce-selenium');
const assert = require('assert');

describeS('end-to-end > clickThroughInfo', function () {
  itS('Successfully Clicks Through Tab Bar', async function (driver) {
    // Launch app store without going to catalog
    await driver.launchAppStore(true);

    // Click on app gradeup
    await driver.click('#gradeup-button');

    // Check screenshots container exists
    assert(await driver.elementExists('.screenshots-container'), 'No screenshots exists');

    // Click on guides button and check guides exists
    await driver.click('#guides-tab-button');
    assert(await driver.elementExists('.guides-container'), 'No guides exists');

    // Click on info button and check info exists
    await driver.click('#info-tab-button');
    assert(await driver.elementExists('.info-container'), 'No info exists');

    // Click back to screenshots tab and checks screenshots exists
    await driver.click('#screenshots-tab-button');
    assert(await driver.elementExists('.screenshots-container'), 'No screenshots exists');
  });
});
