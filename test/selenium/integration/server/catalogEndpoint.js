require('dce-selenium');

const { courseId } = require('../../../../config/devEnvironment');

describeS('Server', function () {
  itS('Responds with Catalog', async function (driver) {
    await driver.visit(`https://localhost:8088/courses/${courseId}`);
    // Click "Simulate Launch"
    // Click "Authorize"
    // Wait 2s
    // Visit https://localhost/catalog
    // Get json from page
    // Test the json to see if it matches data in
    //   /test/dummy-data/store/installable
  });
});
