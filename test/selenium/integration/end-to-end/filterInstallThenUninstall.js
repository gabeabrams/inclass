require('dce-selenium');
const assert = require('assert');

describeS('Client > InstallFollowedByUninstall', function () {
  itS('installs and immediately uninstalls app', async function (driver) {
    await driver.launchAppStore(true);
    // check if filter toggle button exist
    assert(driver.elementExists('#filtertoggle-button'), 'did not render filter toggle button');
    // click filter toggle button
    await driver.waitForElementVisible('#filtertoggle-button');
    await driver.click('#filtertoggle-button');
    // click two lables inside the menu
    await driver.waitForElementVisible('#filter-checkbox-OS-mac');
    await driver.click('#filter-checkbox-OS-mac');
    await driver.click('#filter-checkbox-cost-free');
    // click filter toggle button to retract the menu
    await driver.waitForElementVisible('#filtertoggle-button');
    await driver.click('#filtertoggle-button');
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
