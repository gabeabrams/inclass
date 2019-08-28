require('dce-selenium');
const assert = require('assert');

describeS('end-to-end > gettingSupport', function () {
  itS('Successfully gets support', async function (driver) {
    // Launch app store without going to catalog
    await driver.launchAppStore(true);

    // Click on app gradeup
    await driver.click('#gradeup-app-title');

    // Wait for gradeup page to load in Safari
    await driver.wait(1000);

    // Scroll to bottom of the page and check if support button exists
    await driver.scrollTo('.apppagefooter-container');
    assert(await driver.elementExists('#support-button'), 'No Support Button');

    await driver.click('#support-button');

    // Check all elements exist in support modal
    assert(await driver.elementExists('.emailform-container'), 'No email form container found');
    assert(await driver.elementExists('#copybutton-text'), 'No Copy Button');
    assert(await driver.elementExists('.close'), 'No x (close) button');
    assert(await driver.elementExists('.okay-button'), 'No close button');
    assert(await driver.elementExists('.emailLink'), 'No email link found');
    const html = await driver.getElementInnerHTML('.emailLink');
    assert.equal(html, 'tuftsSupport@tufts.edu', 'Email does not match expected');

    // Close support modal
    await driver.click('.okay-button');
  });
});
