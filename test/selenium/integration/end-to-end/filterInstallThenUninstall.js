require('dce-selenium');
const assert = require('assert');

const { courseId } = require('../../../../config/devEnvironment');

describeS('Client > InstallFollowedByUninstall', function () {
  itS.only('installs and immediately uninstalls app', async function (driver) {
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
    // click filter toggle button
    await driver.click('.filter-toggle-button');
    await driver.wait(200);
    // click two lables inside the menu
    await driver.click('#filter-checkbox-OS-mac');
    await driver.click('#filter-checkbox-cost-free');
    await driver.wait(200);
    // click filter toggle button to retract the menu
    await driver.click('.filter-toggle-button');
    await driver.wait(200);
    // click into app page
    await driver.click('#samsapp-app-title');
    await driver.wait(300);
    // click the install button
    await driver.click('#install-button');
    await driver.wait(600);
    // click okay button
    await driver.click('.okay-button');
    await driver.wait(200);
    // uninstalls the app
    await driver.click('#uninstall-button');
    await driver.wait(600);
    // click okay button
    await driver.click('.okay-button');
    await driver.wait(200);
    assert(await driver.elementExists('#install-button'), 'app was not uninstalled');
  });
});
