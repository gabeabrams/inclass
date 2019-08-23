require('dce-selenium');
const assert = require('assert');

const { courseId } = require('../../../../config/devEnvironment');

describeS.only('Client > InstallFollowedByUninstall', function () {
  itS('installs and immediately uninstalls app', async function (driver) {
    await driver.visit(`https://localhost:8088/courses/${courseId}`);
    // Click "Simulate Launch"
    await driver.click('.launch-button');
    // Click "Authorize"
    await driver.wait(1000);
    if (await driver.elementExists('.authorize-button')) {
      await driver.click('.authorize-button');
    }
    // Wait 2s
    await driver.wait(500);
    // click into app page
    await driver.click('#samsapp-app-title');
    await driver.wait(300);
    // click the install button
    await driver.click('#install-button');
    await driver.wait(1000);
    // click okay button
    await driver.click('.okay-button');
    await driver.wait(200);
    // leave page
    await driver.click('.back-to-app-list-button');
    await driver.wait(200);
    // click into another app
    await driver.click('#gradeup-app-title');
    await driver.wait(200);
    // click the screenshot tab of another app
    await driver.click('#screenshots-tab-button');
    // go back to app list
    await driver.click('.back-to-app-list-button');
    await driver.wait(200);
    // go back into original app
    await driver.click('#samsapp-app-title');
    await driver.wait(300);
    // uninstall the app
    await driver.click('#uninstall-button');
    await driver.wait(600);
    // click okay button
    await driver.click('.okay-button');
    await driver.wait(200);
    assert(await driver.elementExists('#install-button'), 'app was not uninstalled');
  });
});