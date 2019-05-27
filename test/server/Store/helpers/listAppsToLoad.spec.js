const assert = require('assert');
const listapps = require('../../../../server/Store/helpers/listAppsToLoad');
const fileExists = require('../../../../server/Store/helpers/fileExists');
const listFolders = require('../../../../server/Store/helpers/listFolders');
const STORE_PATH = require('../../../../server/Store/STORE_PATH');

describe('server > Store > helpers > getAppsToLoad', function () {
  it('returns an object', async function () {
    const apps = await listapps();
    assert.deepEqual(apps, Object(apps));
  });

  it('contains correct catalogIds and appIds', async function () {
    const testApps = await listapps();
    const catalogs = await listFolders(STORE_PATH);
    // have correct catalogs
    const testCatalogs = Object.keys(testApps);
    testCatalogs.forEach((testCatalog) => {
      assert(catalogs.includes(testCatalog));
    });
    // check if it has correct appIds
    let testAppIds = [];
    Object.values(testApps).forEach((testAppsWithPath) => {
      testAppIds = testAppIds.concat(Object.keys(testAppsWithPath));
    });
    // the correct apps that should be returned from this function
    const apps = ['gradeup', 'swipein', 'swipein', 'swipein'];
    // check if it returns the correct number of appIds
    assert(testAppIds.length === apps.length);
    // check if appIds match
    testAppIds.forEach((testAppId) => {
      const index = apps.indexOf(testAppId);
      if (index !== -1) {
        apps.splice(index, 1);
      }
    });
    assert(apps.length === 0);
  });

  it('returns the correct paths', async function () {
    const apps = await listapps();
    Object.values(apps).forEach((testAppsWithPaths) => {
      // get the paths of each file, and test if it exists
      Object.values(testAppsWithPaths).forEach((testPaths) => {
        assert(fileExists(testPaths));
      });
    });
  });
});
