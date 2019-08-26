require('dce-selenium');
const assert = require('assert');

describeS('End-to-End > filterWithTags', function () {
  itS('Simulates a filtering process using tags', async function (driver) {
    // Launch the appstore
    await driver.launchAppStore(true);
    // Wait for page to load
    await driver.waitForElementVisible('.app-list-container');
    // Open filter drawer
    await driver.click('#filtertoggle-button');
    // Filter by 'free' and 'freshman' tags to filter for only GradeUp
    await driver.clickByContents('free', '.form-check-label');
    await driver.clickByContents('freshman', '.form-check-label');
    // Close drawer to see apps again
    await driver.click('#filtertoggle-button');
    // Look for the app that was filtered for
    const filteredAppExists = await driver.getElementByContents('GradeUp', '.app-title-h3');
    // Make sure that the app is still on the page
    assert(filteredAppExists, 'GradeUp app is missing after search query');
    // Open drawer and reset filters
    await driver.click('#filtertoggle-button');
    await driver.click('#reset-button-cost');
    await driver.click('#reset-button-grade');
    // Close drawer
    await driver.click('#filtertoggle-button');
    // Make sure applist is normal again
    const allAppsExist = await driver.getElementByContents('SwipeIn', '.app-title-h3');
    assert(allAppsExist, 'Apps did not reset to full list after filters were reset');
  });
});
