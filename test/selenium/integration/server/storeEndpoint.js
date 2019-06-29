require('dce-selenium');
const assert = require('assert');

const { courseId } = require('../../../../config/devEnvironment');

describeS.only('Server', function () {
  itS('Responds with Store Metadata', async function (driver) {
    await driver.visit(`https://localhost:8088/courses/${courseId}`);
    // Click "Simulate Launch"
    try {
      await driver.click('.launch-button');
    } catch (err) {
      driver.log(err);
    }
    // Click "Authorize"
    try {
      await driver.click('.authorize-button');
    } catch (err) {
      driver.log(err);
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

    assert.equal(store.title, 'Harvard Appstore', 'Store title is not correct');
  });
});
