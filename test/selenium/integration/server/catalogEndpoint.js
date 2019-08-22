require('dce-selenium');
const assert = require('assert');

describeS('Server > catalogEndpoint', function () {
  itS('Responds with Catalog', async function (driver) {
    await driver.launchAppStore();
    await driver.visit('https://localhost/catalog');
    const { catalog } = await driver.getJSON();
    // Test the json to see if it matches data in installable store
    assert.equal(catalog.title, 'DCE', 'title data did not match');
    assert.deepEqual(catalog.accounts, [1176], 'accounts data did not match');
    const expectedTagsToShow = [
      {
        color: '#0096ff',
        name: 'cost',
      },
      {
        color: '#ff9300',
        name: 'type',
      },
      {
        color: '#008e00',
        name: 'for',
      },
      {
        color: '#8c3437',
        name: 'language',
      },
      {
        color: '#672980',
        name: 'OS',
      },
      {
        color: '#0432ff',
        name: 'semester',
      },
      {
        color: '#ff2f92',
        name: 'grade',
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
