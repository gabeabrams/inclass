require('dce-selenium');

const { courseId } = require('../../../../config/devEnvironment');

describeS('Server', function () {
  itS('Successfully Completes App Lifecycle', async function (driver) {
    await driver.visit(`https://localhost:8088/courses/${courseId}`);
    // Click "Simulate Launch"
    // Click "Authorize"
    // Don't be worried about nothing showing up: we have no client
    // Wait 2s for server to finish loading
    // NOTE: Hi Anita, I forgot one step. I've just done it for you:
    await driver.visit('https://localhost/catalog');
    // Install an app: await driver.post('https://localhost/install/gradeup');
    // get the json and make sure success is true
    // Check if the app is installed: driver.visit the '/installed-apps' page
    // get the json and make sure success is true
    // remember the ltiIds for the app you just installed
    // Uninstall the app by using: driver.delete with 'https://localhost/uninstall'
    //   and include a body with ltiIds: [30578, 30894]
    // Check that the app was uninstalled: driver.visit the '/installed-apps'
    //   page and make sure the app is gone

    // Example:
    // await driver.post('https://localhost/install/gradeup');
    // const json = await driver.getJSON();
    // assert(json.success)
  });
});
