require('dce-selenium');
const assert = require('assert');

const { courseId } = require('../../../../config/devEnvironment');

describeS('Server', function () {
  itS.only('Responds with Catalog', async function (driver) {
    // https://localhost/catalog
    await driver.visit(`https://localhost:8088/courses/${courseId}`);
    // Click "Simulate Launch"
    await driver.click('.launch-button');
    // Click "Authorize"
    // await driver.click('.authorize-button');
    // Wait 2s
    await driver.wait(2000);
    // Visit https://localhost/catalog
    await driver.visit('https://localhost/catalog');
    // Get json from page
    const { catalog } = await driver.getJSON();
    // Test the json to see if it matches data in
    //   /test/dummy-data/store/installable
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
  });
});
