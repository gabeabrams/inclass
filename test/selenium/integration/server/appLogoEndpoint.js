require('dce-selenium');
const assert = require('assert');

describeS('Server', function () {
  itS('Checks app icons are loaded', async function (driver) {
    await driver.launchAppStore();
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
