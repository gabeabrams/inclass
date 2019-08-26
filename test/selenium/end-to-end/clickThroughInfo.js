require('dce-selenium');
const assert = require('assert');
const { courseId } = require('../../../config/devEnvironment');

describeS('end-to-end > intoAppThenOut', function () {
  itS('Successfully Clicks Through Tab Bar', async function (driver) {
    await driver.visit(`https://localhost:8088/courses/${courseId}`);
    // Click "Simulate Launch"
    await driver.click('.launch-button');
    // Click "Authorize"
    await driver.wait(1000);
    if (await driver.elementExists('.authorize-button')) {
      await driver.click('.authorize-button');
    }
    // Wait for page to load
    await driver.wait(2000);
    // Click on app gradeup
    await driver.click('#gradeup-button');
    // Wait for page to load
    await driver.wait(1000);

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
