const assert = require('assert');
const path = require('path');
const proxyquire = require('proxyquire');

// use proxiquire to redirect store path to testing folder
const dummyPath = path.join(__dirname, '../../../dummy-data/store/simple');
const loadCatalogMetadata = proxyquire('../../../../server/Store/helpers/loadCatalogMetadata', {
  '../STORE_CONSTANTS': {
    path: dummyPath,
  },
});

describe('server > Store > helpers > loadCatalogMetadata', function () {
  it.only('contains all the required fields', async function () {
    const testMetadata = await loadCatalogMetadata('dce');
    const requiredFields = ['title', 'accounts', 'tagColors', 'defaultSupportEmail'];
    Object.keys(testMetadata).forEach((testField) => {
      // check that key is populated
      assert(testMetadata[testField]);
      const index = requiredFields.indexOf(testField);
      if (index !== -1) {
        requiredFields.splice(index, 1);
      }
    });
    // check that file has all fields
    assert(requiredFields.length === 0);
  });
});
