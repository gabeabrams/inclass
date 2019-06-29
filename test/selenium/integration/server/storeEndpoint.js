require('dce-selenium');
const assert = require('assert');

const { courseId } = require('../../../../config/devEnvironment');

describeS('Server', function () {
  itS('Responds with Store Metadata', async function (driver) {
    await driver.visit(`https://localhost:8088/courses/${courseId}`);
    // Click "Simulate Launch"
    await driver.click('#launch-button');
    // Click "Authorize"
    await driver.click('#authorize-button');
    // Wait 2s
    await driver.wait(2000);
    // Visit https://localhost/store
    await driver.visit('https://localhost/store');
    // Get the json
    const { success, store } = await driver.getJSON();
    // Test the json
    assert.equal(success, true, 'Success object should be true');
  });
});
