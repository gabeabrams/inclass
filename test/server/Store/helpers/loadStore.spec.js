const assert = require('assert');
const path = require('path');
const proxyquire = require('proxyquire');

describe.only('server > Store > helpers > loadStore', function () {
  it('contains correct fields and data is filled', async function () {
    const dummyPath = path.join(__dirname, '../../../dummy-data/store/medium');
    const loadStore = proxyquire('../../../../server/Store/helpers/loadStore', {
      '../STORE_CONSTANTS': {
        path: dummyPath,
        '@global': true,
      },
    });
    const testStore = await loadStore();
    assert(testStore.store, 'store metadata is not correctly loaded');
    assert(testStore.catalogs, 'catalogs are not correctly loaded');
  });

  it('throws error if there is circular dependency', async function () {
    const dummyPath = path.join(__dirname, '../../../dummy-data/store/circular-dependency');
    const loadStore = proxyquire('../../../../server/Store/helpers/loadStore', {
      '../STORE_CONSTANTS': {
        path: dummyPath,
        '@global': true,
      },
    });
    // check if it throws an error when encountering circular reference
    let error;
    try {
      await loadStore();
    } catch (err) {
      error = err;
    }
    assert(error, 'does not throw error when encountering circular reference');
  });

  it('throws error if store is being edited', async function () {
    const dummyPath = path.join(__dirname, '../../../dummy-data/store/store-being-edited');
    const loadStore = proxyquire('../../../../server/Store/helpers/loadStore', {
      '../STORE_CONSTANTS': {
        path: dummyPath,
        '@global': true,
      },
    });
    // check that store is not being loaded while editing
    let error;
    try {
      await loadStore();
    } catch (err) {
      error = err;
    }
    assert(error, 'does not throw error when reading a store that is being edited');
  });
});
