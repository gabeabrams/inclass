require('dce-selenium');
const assert = require('assert');

describeS('Server', function () {
  itS('Successfully Completes App Lifecycle', async function (driver) {
    await driver.launchAppStore();
    // wait for data in firefox to load
    await driver.wait(1000);

    // Installs an app
    await driver.post('https://localhost/install/gradeup');
    // Wait for JSON data in firefox from installing an app
    await driver.wait(1000);
    // Gets the JSON and makes sure success is true
    const json = await driver.getJSON();
    assert(json.success, 'success is not true for JSON data');
    // // Check if the app is installed: driver.visit the '/installed-apps' page
    await driver.visit('https://localhost/installed-apps');
    // Wait for JSON data in firefox from installing an app
    await driver.wait(1000);
    // get the json and make sure success is true
    const jsonInstalledApps = await driver.getJSON();
    assert(jsonInstalledApps.success, 'success is not true for JSON data');
    const { apps } = jsonInstalledApps;
    // remember the ltiIds for the app you just installed
    const body = {};
    for (let i = 0; i < apps.length; i++) {
      const app = apps[i];
      if (app.appId === 'gradeup') {
        body.ltiIds = JSON.stringify(app.ltiIds);
        break;
      }
    }
    // Uninstall the app by using: driver.delete with 'https://localhost/uninstall'
    //   and include a body with ltiIds: [30578, 30894]
    // (NOTE: Cannot get uninstall?) Problem with uninstalling the app
    await driver.post('https://localhost/uninstall', body);
    // Check that the app was uninstalled: driver.visit the '/installed-apps'
    //   page and make sure the app is gone
    await driver.visit('https://localhost/installed-apps');
    await driver.wait(1000);
    const jsonNewInstalledApps = await driver.getJSON();
    assert(jsonNewInstalledApps.success, 'success is not true for JSON data');
    const newApps = jsonNewInstalledApps.apps;
    newApps.forEach((app) => {
      assert(app.appId !== 'gradeup', 'Did not delete app');
    });
  });
});
