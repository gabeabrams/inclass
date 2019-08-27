require('dce-selenium');
const assert = require('assert');

describeS('End-to-End > filterWithQueryTagsRemoving', function () {
  itS('Simulates a filtering process using search query and filter tags, and removes them', async function (driver) {
    await driver.launchAppStore(true);
    // Type into search field
    await driver.waitForElementVisible('#searchfield-input');
    await driver.typeInto('#searchfield-input', 'Gr');
    // Look for the app that was filtered for
    let swipeInExists;
    let gradeUpExists;
    gradeUpExists = await driver.elementExists('#gradeup-appItem');
    swipeInExists = await driver.elementExists('#swipein-appItem');
    // Make sure that the apps are still on the page
    assert(gradeUpExists, 'GradeUp app is missing after search query');
    assert(swipeInExists, 'SwipeIn app is missing after search query');

    // Now use filters and make sure they are filtering
    // Open filter drawer
    await driver.click('#filtertoggle-button');
    // Filter by 'free' and 'freshman' tags to filter for only GradeUp
    await driver.click('#filter-checkbox-type-attendance');
    // Close drawer to see apps again
    await driver.click('#filtertoggle-button');
    swipeInExists = null;
    swipeInExists = await driver.elementExists('#swipein-appItem');
    assert(swipeInExists, 'SwipeIn app is missing from list');
    // Make sure only one app is in list
    const appMissing = await driver.elementAbsent('#gradeup-appItem');
    assert.equal(
      appMissing,
      true,
      'GradeUp app is showing when it should not be'
    );
    // Remove filter
    await driver.click('#filtertoggle-button');
    await driver.click('#reset-button-type');
    // Make sure that GradeUp is present
    gradeUpExists = null;
    gradeUpExists = await driver.elementExists('#gradeup-appItem');
    assert(gradeUpExists, 'GradeUp app is missing');
    // Remove search query
    await driver.typeInto('#searchfield-input', '\b\b');
    // Make sure other apps are back
    const notInstalledExists = await driver.elementExists('#notinstalled-appItem');
    assert(notInstalledExists, 'NotInstalled is missing');
  });
});
