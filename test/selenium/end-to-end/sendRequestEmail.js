require('dce-selenium');
const assert = require('assert');

const { courseId } = require('../../../config/devEnvironment');

describeS('end-to-end > send request email', function () {
  itS('Successfully sends request email', async function (driver) {
    // Launch app store without going to catalog
    await driver.launchAppStore(true);

    // Click on app gradeup
    await driver.click('#gradeup-app-title');

    // Wait for gradeup page to load in Safari
    await driver.waitForElementVisible('.apppagefooter-container');

    // Check if install button exists
    await driver.click('#install-button');

    // Click the "Okay" button to continue install
    await driver.click('.okay-button');

    // Check all elements exist in support modal
    assert(await driver.elementExists('.emailform-container'), 'No email form container found');
    assert(await driver.elementExists('#copybutton-text'), 'No Copy Button');
    assert(await driver.elementExists('.close'), 'No x (close) button');
    assert(await driver.elementExists('.okay-button'), 'No close button');
    assert(await driver.elementExists('.emailLink'), 'No email link found');
    const email = await driver.getElementInnerHTML('.emailLink');
    assert.equal(email, 'harvard@hvd.edu', 'Email does not match expected');

    // Checks href is sending out an email
    const regex = /mailto.*"/g;
    const parentElem = await driver.parentOf('.emailLink');
    const html = await driver.getElementInnerHTML(parentElem);
    const matches = html.match(regex);
    assert.equal(matches.length, 1, 'No mailto link');
    const match = matches[0].replace('"', '');
    assert(match.startsWith('mailto:'), 'No mailto in link');
    assert(match.includes('subject='), 'No subject in link');

    // Decode the subject and check that it's right
    const decodedSubject = decodeURIComponent(match.split('subject=')[1]);
    assert.equal(
      decodedSubject,
      `I want to install GradeUp into course ${courseId}`,
      'Invalid email subject'
    );

    // Close support modal
    await driver.click('.okay-button');
  });
});
