require('dce-selenium');
const assert = require('assert');

const { courseId } = require('../../../../config/devEnvironment');

describeS('Server', function () {
  itS('Serves store logo', async function (driver) {
    await driver.visit(`https://localhost:8088/courses/${courseId}`);
    // Click "Simulate Launch"
    // Catch the error firefox throws when visiting localhost
    try {
      await driver.click('.launch-button');
    } catch (err) {
      driver.log(err);
    }
    // Wait to ensure server is loaded
    await driver.wait(1500);
    // Visit https://localhost/public/logo
    await driver.visit('https://localhost/public/logo');
    // get the source of the page
    const source = await driver.getSource();
    // check that the source contains an image tag for store logo
    assert(source.includes('<img'), 'store logo is not correctly served');
  });
});
