const assert = require('assert');
const path = require('path');
const proxyquire = require('proxyquire');

const dummyPath = path.join(__dirname, '../../../dummy-data/store/medium');
const loadStore = proxyquire('../../../../server/Store/helpers/loadStore', {
  '../STORE_CONSTANTS': {
    path: dummyPath,
    '@global': true,
  },
});

describe('server > Store > helpers > loadStore', function () {
  it.only('contains correct fields and data is filled', async function () {
    const testStore = await loadStore();
    assert(testStore.store);
    assert(testStore.catalogs);
  });
});
