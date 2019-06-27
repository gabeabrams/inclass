require('dce-selenium');

const { courseId } = require('../../../../config/devEnvironment');

describeS('Server', function () {
  itS('Responds with Catalog', async function (driver) {
    // https://localhost/catalog
    await driver.visit(`https://localhost:8088/courses/${courseId}`);
    // Click "Simulate Launch"
    await driver.click('#launch-button');
    // Click "Authorize"
    await driver.click('#authorize-button');
    // Wait 2s
    await driver.wait(2000);
    // Visit https://localhost/catalog
    await driver.visit('https://localhost/catalog');
    // Get json from page
    const catalog = await driver.getJSON();
    // Test the json to see if it matches data in
    //   /test/dummy-data/store/installable
  });
});
