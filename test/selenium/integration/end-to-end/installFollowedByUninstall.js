require('dce-selenium');
const assert = require('assert');

describeS('Client > InstallFollowedByUninstall', function () {
  itS('installs and immediately uninstalls app', async function (driver) {
    await driver.launchAppStore(true);
    // click into app page
    await driver.waitForElementVisible('#samsapp-app-title');
    await driver.click('#samsapp-app-title');
    // click the install button
    await driver.waitForElementVisible('#install-button');
    await driver.click('#install-button');
    // click okay button
    await driver.waitForElementVisible('.okay-button');
    await driver.click('.okay-button');
    // uninstalls the app
    await driver.waitForElementVisible('#uninstall-button');
    await driver.click('#uninstall-button');
    // click okay button
    await driver.waitForElementVisible('.okay-button');
    await driver.click('.okay-button');
    assert(await driver.elementExists('#install-button'), 'app was not uninstalled');
  });
});
