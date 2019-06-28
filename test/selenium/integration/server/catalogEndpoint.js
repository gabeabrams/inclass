require('dce-selenium');
const assert = require('assert');

const { courseId } = require('../../../../config/devEnvironment');

describeS('Server', function () {
  itS('Responds with Catalog', async function (driver) {
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
    // Test the json to see if it matches data in installable store
    assert.equal(catalog.title, 'DCE catalog', 'title data did not match');
    assert.deepEqual(catalog.accounts, [1176], 'accounts data did not match');
    const expectedTagsToShow = [
      {
        tagName: 'cost',
        color: 'blue',
      },
      {
        tagName: 'type',
        color: 'red',
      },
    ];
    assert.deepEqual(catalog.tagsToShow, expectedTagsToShow, 'tagsToShow data did not match');
    assert.equal(catalog.defaultSupportEmail, 'example@harvard.edu', 'defaultSupportEmail did not match');
    // spot check individual apps
    const { gradeup, swipein, notinstalled } = catalog.apps;

    // check gradeup
    assert.equal(gradeup.title, 'GradeUp', 'gradeUp app title did not match');
    assert.equal(gradeup.subtitle, 'GradeUp is a great tool', 'gradeUp app subtitle did not match');
    assert.deepEqual(gradeup.creator, ['dce'], 'gradeUp creator data did not match');
    // defaults to public if not included in metadata
    assert.equal(gradeup.launchPrivacy, 'public', 'gradeUp launchPrivacy did not match');
    assert.equal(gradeup.supportEmail, 'tuftsSupport@tufts.edu', 'gradeUp supportEmail did not match');

    // check swipein
    assert.equal(swipein.title, 'SwipeIn', 'swipein app title did not match');
    assert.equal(swipein.subtitle, 'SwipeIn is a great tool', 'swipein app subtitle did not match');
    assert.deepEqual(swipein.creator, ['dce'], 'swipein creator data did not match');
    assert.equal(swipein.launchPrivacy, 'anonymous', 'swipein launchPrivary did not match');
    assert.equal(swipein.supportEmail, 'example@harvard.edu', 'swipeIn supportEmail field did not match');

    // check notinstalled
    assert.equal(notinstalled.title, 'NotInstalled', 'notinstalled app title did not match');
    assert.equal(notinstalled.subtitle, 'NotInstalled is an awful tool', 'notinstalled app subtitle did not match');
    assert.deepEqual(notinstalled.creator, ['dce'], 'notinstalled creator data did not match');
    assert.equal(notinstalled.launchPrivacy, 'anonymous', 'notinstalled launchPrivary did not match');
    assert.equal(notinstalled.supportEmail, 'example@harvard.edu', 'notinstalled supportEmail field did not match');
  });
});
