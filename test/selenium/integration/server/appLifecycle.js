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

    // TODO: Delete this later
    await driver.visit('https://localhost/installed-apps');
    await driver.wait(1000);
    await driver.pause();
    const testJSON = await driver.getJSON();
    assert(testJSON.success, 'success is not true for JSON data');

    // Installs an app (Note: safari can't do this?)
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
    await driver.pause();
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
    await driver.pause();
    const jsonNewInstalledApps = await driver.getJSON();
    assert(jsonNewInstalledApps.success, 'success is not true for JSON data');
    // const newApps = jsonNewInstalledApps.apps;
    // newApps.forEach((app) => {
    //   // assert(app.appId !== 'notinstalled', 'Did not delete app');
    // });
  });
});
