const assert = require('assert');
const proxyquire = require('proxyquire');
const ExpressApp = require('../../dummy-objects/ExpressApp');
const Store = require('../../../server/Store/index');

const expressApp = new ExpressApp();
const badExpressApp = 'Not Real';

describe.only('server > Store > index', function () {
  it('Checks metadata objects untouched when error occurs', async function () {
    const store = new Store(badExpressApp);
    const { storeMetadata } = store;
    if (Object.keys(storeMetadata).length !== 0) {
      throw new Error('storeMetadata shoudl be empty');
    }
  });

  // it('Checks metadata objects are accurate', async function () {
  //   const store = new Store(expressApp);
  //   const storeMetadata = store.getStoreMetadata();
  //   const 
  //   // Check app doesn't have XML etc
  // });

  // it('Checks getCatalogAndPermissions returns expected item', async function () {

  // });

  // it('Checks getInstallData when has no data for a catalog or app', async function () {

  // });

  // it('Checks getStoreMetadata returns expected item', async function () {

  // });
});
