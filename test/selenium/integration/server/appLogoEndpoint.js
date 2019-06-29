require('dce-selenium');
const assert = require('assert');

const { courseId } = require('../../../../config/devEnvironment');

describeS('Server', function () {
  itS.only('Checks app icons are loaded', async function (driver) {
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
    // Visit https://localhost/catalog
    await driver.visit('https://localhost/catalog');
    // wait to ensure the raw data tab in firefox load
    await driver.wait(1000);
    // Get json from page
    const { catalog } = await driver.getJSON();
    const appIds = Object.keys(catalog.apps);
    let source;
    // go through each app and check its url is served
    for (let i = 0; i < appIds.length; i++) {
      const appId = appIds[i];
      const app = catalog.apps[appId];
      await driver.visit(`https://localhost${app.icon.url}`);
      source = await driver.getSource();
      assert(source.includes('<img'), `${appId}'s icon is not served correctly`);
    }
  });
});
