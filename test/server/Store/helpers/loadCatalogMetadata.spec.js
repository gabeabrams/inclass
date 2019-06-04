const assert = require('assert');
const path = require('path');
const proxyquire = require('proxyquire');

// use proxiquire to redirect store path to testing folder
const dummyPath = path.join(__dirname, '../../../dummy-data/store/medium');
const loadCatalogMetadata = proxyquire('../../../../server/Store/helpers/loadCatalogMetadata', {
  '../STORE_CONSTANTS': {
    path: dummyPath,
  },
});

describe('server > Store > helpers > loadCatalogMetadata', function () {
  it('contains all the required fields', async function () {
    const testMetadata = await loadCatalogMetadata('dce');
    const requiredKeys = ['title', 'accounts', 'tagColors', 'defaultSupportEmail'];
    const testKeys = Object.keys(testMetadata);
    Object.keys(testMetadata).forEach((testKey) => {
      // check that key is populated
      assert.notEqual(testMetadata[testKey], undefined);
      assert(requiredKeys.includes(testKey));
    });
    // check that file has all fields
    assert(requiredKeys.length === testKeys.length);
  });
});
