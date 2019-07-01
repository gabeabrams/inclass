require('dce-selenium');
const assert = require('assert');

const { courseId } = require('../../../../config/devEnvironment');

describeS('Server', function () {
  itS.only('Successfully Completes App Lifecycle', async function (driver) {
    await driver.visit(`https://localhost:8088/courses/${courseId}`);
    // Clicks "Simulate Launch"
    try {
      await driver.click('.launch-button');
    } catch (err) {
      driver.log(err);
    }
    // Clicks "Authorize"
    try {
      await driver.click('.authorize-button');
    } catch (err) {
      driver.log(err);
    }
    // Waits 2s for server to finish loading
    await driver.wait(2000);
    // Visit https://localhost/catalog
    await driver.visit('https://localhost/catalog');
    // wait for data in firefox to load
    await driver.wait(1000);
    // Installs an app (Note: safari can't do this?)
    await driver.post(`https://localhost/install/notinstalled`);
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
    let toUninstall;
    apps.forEach((app) => {
      if (app.appId === 'notinstalled') {
        toUninstall = app.ltiIds;
      }
    });
    // Uninstall the app by using: driver.delete with 'https://localhost/uninstall'
    //   and include a body with ltiIds: [30578, 30894]
    await driver.delete('https://localhost/uninstall', toUninstall);
    // Check that the app was uninstalled: driver.visit the '/installed-apps'
    //   page and make sure the app is gone

    // Example:
    // await driver.post('https://localhost/install/gradeup');
    // const json = await driver.getJSON();
    // assert(json.success)
  });
});
