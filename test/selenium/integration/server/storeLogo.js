require('dce-selenium');
const assert = require('assert');

describeS('Server', function () {
  itS('Serves store logo', async function (driver) {
    await driver.launchAppStore();
    // Visit https://localhost/public/logo
    await driver.visit('https://localhost/public/logo');
    // get the source of the page
    const source = await driver.getSource();
    // check that the source contains an image tag for store logo
    assert(source.includes('<img'), 'store logo is not correctly served');
  });
});
