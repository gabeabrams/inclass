require('dce-selenium');
const assert = require('assert');

describeS('end-to-end > gettingSupport', function () {
  itS('Successfully gets support', async function (driver) {
    // Launch app store without going to catalog
    await driver.launchAppStore(true);

    // Click on app gradeup
    await driver.click('#gradeup-app-title');

    // Wait for gradeup page to load in Safari
    await driver.waitForElementVisible('.apppagefooter-container');

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
    const email = await driver.getElementInnerHTML('.emailLink');
    assert.equal(email, 'tuftsSupport@tufts.edu', 'Email does not match expected');

    // Checks href is sending out an email
    const regex = /mailto.*"/g;
    const parentElem = await driver.parentOf('.emailLink');
    const html = await driver.getElementInnerHTML(parentElem);
    const matches = html.match(regex);
    assert(matches[0].startsWith('mailto:'));
    assert(matches[0].includes('subject='));

    // Close support modal
    await driver.click('.okay-button');
  });
});
