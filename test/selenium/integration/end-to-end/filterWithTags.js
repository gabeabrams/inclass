require('dce-selenium');
const assert = require('assert');

describeS('End-to-End > filterWithTags', function () {
  itS('Simulates a filtering process using tags', async function (driver) {
    await driver.launchAppStore();
    await driver.wait(1000);
    // Open filter drawer
    await driver.click('.btn');
    // Filter by 'free' and 'freshman' tags to filter for only GradeUp
    await driver.clickByContents('free', '.form-check-label');
    await driver.clickByContents('freshman', '.form-check-label');
    // Close drawer to see apps again
    await driver.click('.button-container');
    // Look for the app that was filtered for
    const filteredAppExists = await driver.getElementByContents('GradeUp', '.app-title-h3');
    // Make sure that the app is still on the page
    assert(filteredAppExists, 'GradeUp app is missing after search query');
    // Open drawer and reset filters
    await driver.click('.button-container');
    await driver.click('#reset-button-cost');
    await driver.click('#reset-button-grade');
    // Close drawer
    await driver.click('.button-container');
    // Make sure applist is normal again
    const allAppsExist = await driver.getElementByContents('SwipeIn', '.app-title-h3');
    assert(allAppsExist, 'Apps did not reset to full list after filters were reset');
  });
});
