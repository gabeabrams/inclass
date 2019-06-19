const assert = require('assert');
const proxyquire = require('proxyquire');
const path = require('path');
const ExpressApp = require('../../dummy-objects/ExpressApp');
const API = require('../../dummy-objects/API');

const badExpressApp = 'Not Real';
const dummyPath = path.join(__dirname, '../../dummy-data/store/medium');
const Store = proxyquire('../../../server/Store', {
  './STORE_CONSTANTS': {
    path: dummyPath,
    '@global': true,
  },
});

describe('server > Store > index', function () {
  // delay function using promises
  async function delay(ms) {
    // return await for better async stack trace support in case of errors.
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  it.only('replaces store if reload successful', async function () {
    // set the maximum timeout for this test to be 40 seconds
    this.timeout(40000);
    const store = new Store(expressApp);
    await delay(25000);
    // check if the newly loaded store is the same as the old one
    const newStore = new Store(expressApp);
    assert.deepEqual(store, newStore);
  });
  it('does not replace the store if reload failed', async function () {

  });
  it('does not update store if being edited is true', async function () {

  });
  it('Checks metadata objects untouched when error occurs', async function () {
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
    const expressApp = new ExpressApp();
    const store = new Store(expressApp);
    await store._attemptLoad();
    const myInstallData = store.getInstallData('notReal', 'fakeApp');
    assert(!myInstallData, 'getInstallData did not return null');
  });

  it('Checks getStoreMetadata returns expected item', async function () {
    const expressApp = new ExpressApp();
    const store = new Store(expressApp);
    await store._attemptLoad();
    const myStoreMetadata = store.getStoreMetadata();
    const values = Object.values(myStoreMetadata);
    assert.equal(values[0], 'Harvard Appstore', 'getStoreMetadata did not return expected item');
  });

  it('Deletes installXML and installationCredentials from app metadata', async function () {
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
