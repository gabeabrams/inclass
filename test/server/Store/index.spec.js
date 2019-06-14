const assert = require('assert');
const ExpressApp = require('../../dummy-objects/ExpressApp');
const Store = require('../../../server/Store/index');
const API = require('../../dummy-objects/API');

const expressApp = new ExpressApp();
const badExpressApp = 'Not Real';
const store = new Store(expressApp);

describe.only('server > Store > index', function () {
  it('Checks metadata objects untouched when error occurs', async function () {
    const successful = await store._attemptLoad();
    const badStore = new Store(badExpressApp);
    if (successful.success === true
    && Object.keys(badStore.storeMetadata).length !== 0
    && Object.keys(badStore.accountIdToCatalogId).length !== 0
    && Object.keys(badStore.catalogIdToCatalogMetadata).length !== 0
    && Object.keys(badStore.installData).length !== 0) {
      throw new Error('metadata variables should be empty');
    }
  });

  it('Checks metadata objects are filled', async function () {
    await store._attemptLoad();
    const {
      storeMetadata,
      accountIdToCatalogId,
      catalogIdToCatalogMetadata,
      installData,
    } = store;
    if (Object.keys(storeMetadata).length === 0
    && Object.keys(accountIdToCatalogId).length === 0
    && Object.keys(catalogIdToCatalogMetadata).length === 0
    && Object.keys(installData).length === 0) {
      throw new Error('metadata variables should be filled');
    }
  });

  it('Checks getCatalogAndPermissions returns expected item', async function () {
    const api = new API();
    const launchInfo = { courseId: 102 };
    const dataPermissions = await store
      .getCatalogAndPermissions(api, launchInfo);
    assert.equal(dataPermissions.matchCatalogId, 'seas', 'Did not return the right catalog');
    assert.equal(dataPermissions.isAdmin, true, 'Did not return the right admin permission');
  });

  it('Checks getInstallData returns expected item', async function () {
    const myInstallData = store.getInstallData('dce', 'gradeup');
    const expectedData = {
      name: 'Harvard Appstore',
      description: undefined,
      key: 'consumer key is here',
      secret: 'this is the consumer\'s secret',
      xml: '<?xml version = "1.0"?>\n<contact-info>\n   <name>Tanmay Patil</name>\n   <company>TutorialsPoint</company>\n   <phone>(011) 123-4567</phone>\n</contact-info>',
      launchPrivacy: undefined,
    };
    assert.deepEqual(myInstallData, expectedData, 'installData returned was not what is expected');
  });

  it('Checks getInstallData returns null when there is no installdata for a catalog or app', async function () {
    const myInstallData = store.getInstallData('notReal', 'fakeApp');
    assert(!myInstallData, 'getInstallData did not return null');
  });

  it('Checks getStoreMetadata returns expected item', async function () {
    const myStoreMetadata = store.getStoreMetadata();
    const values = Object.values(myStoreMetadata);
    assert.equal(values[0], 'Harvard Appstore', 'getStoreMetadata did not return expected item');
  });
});
