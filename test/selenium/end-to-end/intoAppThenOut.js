require('dce-selenium');
const assert = require('assert');
const { courseId } = require('../../../config/devEnvironment');

describeS('end-to-end > intoAppThenOut', function () {
  itS('Successfully Goes Into an App then Goes Out to AppList', async function (driver) {
    await driver.visit(`https://localhost:8088/courses/${courseId}`);
    // Click "Simulate Launch"
    await driver.click('.launch-button');
    // Click "Authorize"
    await driver.wait(1000);
    if (await driver.elementExists('.authorize-button')) {
      await driver.click('.authorize-button');
    }

    await driver.wait(2000);

    // Click on the app GradeUp
    await driver.click('#gradeup-button');

    // Check elements of app page are there
    assert(await driver.elementExists('.apppagefooter-container'), 'No footer exists');
    assert(await driver.elementExists('.nav-tabs'), 'No tab bar exists');
    assert(await driver.elementExists('.appPage-appitem'), 'No app item exists');

    // Click on the back to app list button
    await driver.scrollTo('.backtoapplistbutton-container');
    await driver.click('#backtoapplistbutton-button');

    assert(await driver.elementExists('.app-list-container'), 'No appItems exists');
  });
});
