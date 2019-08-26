require('dce-selenium');
const assert = require('assert');

describeS('end-to-end > intoAppThenOut', function () {
  itS('Successfully Goes Into an App then Goes Out to AppList', async function (driver) {
    // Launch App Store (without going to catalog)
    await driver.launchAppStore(true);

    // Click on the app GradeUp
    await driver.click('#gradeup-button');

    // Check elements of app page are there
    assert(await driver.elementExists('.apppagefooter-container'), 'No footer exists');
    assert(await driver.elementExists('.nav-tabs'), 'No tab bar exists');
    assert(await driver.elementExists('.appPage-appitem'), 'No app item exists');

    // Click on the back to app list button
    await driver.scrollTo('.backtoapplistbutton-container');
    await driver.click('#backtoapplistbutton-button');

    // Check it is back into the app list page
    assert(await driver.elementExists('.app-list-container'), 'No appItems exists');
  });
});
