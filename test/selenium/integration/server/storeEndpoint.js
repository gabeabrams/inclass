require('dce-selenium');
const assert = require('assert');

const { courseId } = require('../../../../config/devEnvironment');

describeS('Server > storeEndpoint', function () {
  itS('Responds with Store Metadata', async function (driver) {
    await driver.visit(`https://localhost:8088/courses/${courseId}`);
    // Click "Simulate Launch"
    await driver.click('.launch-button');
    // Click "Authorize"
    await driver.wait(1000);
    if (await driver.elementExists('.authorize-button')) {
      await driver.click('.authorize-button');
    }
    // Wait 2s
    await driver.wait(2000);
    // Visit https://localhost/store
    await driver.visit('https://localhost/store');
    // Wait for raw data tab in firefox
    await driver.wait(1000);
    // Get the json
    const { success, store } = await driver.getJSON();
    // Test the json
    assert.equal(success, true, 'Success object should be true');

    assert.equal(store.title, 'Harvard', 'Store title is not correct');
  });
});
