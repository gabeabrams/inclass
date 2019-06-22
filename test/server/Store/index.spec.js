const assert = require('assert');
const copydir = require('copy-dir');
const fs = require('fs');
const proxyquire = require('proxyquire');
const path = require('path');
const ExpressApp = require('../../dummy-objects/ExpressApp');
const API = require('../../dummy-objects/API');
const STORE_CONSTANTS = require('../../../server/Store/STORE_CONSTANTS');

const badExpressApp = 'Not Real';
const reloadSec = STORE_CONSTANTS.hotReloadSecs;

describe('server > Store > index', function () {
  // delay function using promises, forcing npm test to wait
  async function delay(ms) {
    return new Promise((resolve) => { return setTimeout(resolve, ms); });
  }

  it.only('replaces store if reload successful', async function () {
    const expressApp = new ExpressApp();
    // set the maximum timeout for this test to be 15 seconds
    this.timeout(reloadSec * 1000 + 5000);
    // copy the store into testStore
    const dummyPath = path.join(__dirname, '../../dummy-data/store/medium');
    const testStorePath = path.join(dummyPath, '..', 'medium-store-test-for-hotReload');
    copydir.sync(dummyPath, testStorePath, {
      utimes: true, // keep add time and modify time
      mode: true, // keep file mode
      cover: true, // cover file when exists, default is true
    });
    // load the test store
    const Store = proxyquire('../../../server/Store', {
      './STORE_CONSTANTS': {
        path: testStorePath,
        '@global': true,
      },
    });
    const testStore = new Store(expressApp);
    await testStore._attemptLoad();
    // check if store is loaded correctly
    assert.equal(testStore.storeMetadata.title, 'Harvard Appstore', 'did not load store correctly');

    // read the testStore metadata file in using fs.readFileSync
    let fileContent = fs.readFileSync(path.join(testStorePath, 'metadata.json'), 'utf-8');
    fileContent = fileContent.replace('Harvard', 'Tufts');
    fs.writeFileSync(path.join(testStorePath, 'metadata.json'), fileContent);
    // wait for store to reload
    await delay(reloadSec * 1000 + 1000);
    assert.equal(testStore.storeMetadata.title, 'Tufts Appstore', 'did not replace store with successfully reloaded store');

  });

  it.skip('does not update store if being edited is true', async function () {
    const expressApp = new ExpressApp();
    // set the maximum timeout for this test to be 45 seconds
    this.timeout(45000);
    const store = new Store(expressApp);
    await store._attemptLoad();
    // this console.log is for instruction
    console.log('store finished loading for the first time');
    assert.equal(store.storeMetadata.title, 'Tufts Appstore', 'did not load store correctly');
    // wait for the store to reload
    // during this time, add beingEdited proterty to true in the store
    // metadata, change the store title to 'Apple Appstore', however the store
    // object should not be updated
    console.log('1: change the store metadata title from \'Tufts Appstore\' to \'Apple Appstore\' now');
    console.log('2: add "beingEdited": true to store metadata');
    await delay(35000);
    assert.equal(store.storeMetadata.title, 'Tufts Appstore', 'updated store while store beingEdited is true');
    // after this test passed, delete the beingEdited property, storeMetadata
    // title should be 'Apple Appstore' for the upcoming test
  });

  it.skip('does not replace the store if reload failed', async function () {
    const expressApp = new ExpressApp();
    // set the maximum timeout for this test to be 50 seconds
    this.timeout(50000);
    // delay 5 seconds to delete the beingEdited property from the previous test
    console.log('delete the "beingEdited": true from store metadata now');
    await delay(5000);
    const store = new Store(expressApp);
    await store._attemptLoad();
    // this console.log is for instruction
    console.log('store finished loading for the first time');
    assert.equal(store.storeMetadata.title, 'Apple Appstore', 'did not load store correctly');
    // wait for the store to reload, during this time, break the JSON format
    // in medium > gradeup > metadata.json, this causes the reload to fail and
    // should not update the store object
    console.log('1: break the medium > gradeup > metadata.json file format by adding a period at the end');
    console.log('2: change the title in store metadata back to \'Harvard Appstore\'');
    await delay(35000);
    assert.equal(store.storeMetadata.title, 'Apple Appstore', 'update store while reloading failed');
    console.log('return modified metadata file to correct format now');
    // return the modified metadata file medium > gradeup > metadata.json to
    // correct format so other test can resume
    await delay(8000);
  });

  it('Checks metadata objects untouched when error occurs', async function () {
    const dummyPath = path.join(__dirname, '../../dummy-data/store/medium');
    const Store = proxyquire('../../../server/Store', {
      './STORE_CONSTANTS': {
        path: dummyPath,
        '@global': true,
      },
    });
    const badStore = new Store(badExpressApp);
    const successful = await badStore._attemptLoad();

    assert(!successful.success, 'No error occurred');

    if (
      Object.keys(badStore.storeMetadata).length !== 0
      || Object.keys(badStore.accountIdToCatalogId).length !== 0
      || Object.keys(badStore.catalogIdToCatalogMetadata).length !== 0
      || Object.keys(badStore.installData).length !== 0
    ) {
      throw new Error('metadata variables should be empty');
    }
  });

  it('Checks metadata objects are filled', async function () {
    const dummyPath = path.join(__dirname, '../../dummy-data/store/medium');
    const Store = proxyquire('../../../server/Store', {
      './STORE_CONSTANTS': {
        path: dummyPath,
        '@global': true,
      },
    });
    const expressApp = new ExpressApp();
    const store = new Store(expressApp);
    await store._attemptLoad();

    const {
      storeMetadata,
      accountIdToCatalogId,
      catalogIdToCatalogMetadata,
      installData,
    } = store;
    if (
      Object.keys(storeMetadata).length === 0
      || Object.keys(accountIdToCatalogId).length === 0
      || Object.keys(catalogIdToCatalogMetadata).length === 0
      || Object.keys(installData).length === 0
    ) {
      throw new Error('metadata variables should be filled');
    }
  });

  it('serves apps icons and store logo properly', async function () {
    const dummyPath = path.join(__dirname, '../../dummy-data/store/medium');
    const Store = proxyquire('../../../server/Store', {
      './STORE_CONSTANTS': {
        path: dummyPath,
        '@global': true,
      },
    });
    const expressApp = new ExpressApp();
    const store = new Store(expressApp);
    await store._attemptLoad();
    assert.equal(expressApp.used[0].path, '/public/logo', 'The URL does not match what is expected');
    const { catalogIdToCatalogMetadata } = store;
    Object.keys(catalogIdToCatalogMetadata).forEach((catalogId) => {
      const { apps } = catalogIdToCatalogMetadata[catalogId];
      Object.keys(apps).forEach((appId) => {
        assert(apps[appId].icon.url, `Did not update icon url for catalog ${catalogId} in app ${appId}`);
      });
    });
  });

  it('Checks getCatalogAndPermissions returns expected item', async function () {
    const dummyPath = path.join(__dirname, '../../dummy-data/store/medium');
    const Store = proxyquire('../../../server/Store', {
      './STORE_CONSTANTS': {
        path: dummyPath,
        '@global': true,
      },
    });
    const expressApp = new ExpressApp();
    const store = new Store(expressApp);
    await store._attemptLoad();
    const api = new API();
    const launchInfo = { courseId: 102 };
    const dataPermissions = (
      await store.getCatalogAndPermissions(api, launchInfo)
    );
    assert.equal(dataPermissions.catalogId, 'seas', 'Did not return the right catalogId');
    assert.equal(dataPermissions.catalog.title, 'SEAS Catalog', 'Did not return the right catalog');
    assert.equal(dataPermissions.isAdmin, true, 'Did not return the right admin permission');
  });

  it('Checks getInstallData returns expected item', async function () {
    const dummyPath = path.join(__dirname, '../../dummy-data/store/medium');
    const Store = proxyquire('../../../server/Store', {
      './STORE_CONSTANTS': {
        path: dummyPath,
        '@global': true,
      },
    });
    const expressApp = new ExpressApp();
    const store = new Store(expressApp);
    await store._attemptLoad();

    const myInstallData = store.getInstallData('dce', 'gradeup');
    const expectedData = {
      name: 'GradeUp',
      description: 'longer version of the subtitle',
      key: 'consumer key is here',
      secret: 'this is the consumer\'s secret',
      xml: '<?xml version = "1.0"?>\n<contact-info>\n   <name>Tanmay Patil</name>\n   <company>TutorialsPoint</company>\n   <phone>(011) 123-4567</phone>\n</contact-info>',
      launchPrivacy: 'public',
    };
    assert.deepEqual(myInstallData, expectedData, 'installData returned was not what is expected');
  });

  it('Checks getInstallData returns null when there is no installdata for a catalog or app', async function () {
    const dummyPath = path.join(__dirname, '../../dummy-data/store/medium');
    const Store = proxyquire('../../../server/Store', {
      './STORE_CONSTANTS': {
        path: dummyPath,
        '@global': true,
      },
    });
    const expressApp = new ExpressApp();
    const store = new Store(expressApp);
    await store._attemptLoad();
    const myInstallData = store.getInstallData('notReal', 'fakeApp');
    assert(!myInstallData, 'getInstallData did not return null');
  });

  it('Checks getStoreMetadata returns expected item', async function () {
    const dummyPath = path.join(__dirname, '../../dummy-data/store/medium');
    const Store = proxyquire('../../../server/Store', {
      './STORE_CONSTANTS': {
        path: dummyPath,
        '@global': true,
      },
    });
    const expressApp = new ExpressApp();
    const store = new Store(expressApp);
    await store._attemptLoad();
    const myStoreMetadata = store.getStoreMetadata();
    const values = Object.values(myStoreMetadata);
    assert.equal(values[0], 'Harvard Appstore', 'getStoreMetadata did not return expected item');
  });

  it('Deletes installXML and installationCredentials from app metadata', async function () {
    const dummyPath = path.join(__dirname, '../../dummy-data/store/medium');
    const Store = proxyquire('../../../server/Store', {
      './STORE_CONSTANTS': {
        path: dummyPath,
        '@global': true,
      },
    });
    const expressApp = new ExpressApp();
    const store = new Store(expressApp);
    await store._attemptLoad();

    const swipeIn = store.catalogIdToCatalogMetadata.seas.apps.swipein;

    // Make sure installationCredentials are deleted
    assert.equal(
      swipeIn.installationCredentials,
      undefined,
      'installationCredentials are not deleted'
    );

    // Make sure installXML is deleted
    assert.equal(
      swipeIn.installXML,
      undefined,
      'installXML was not deleted'
    );
  });
});
