const assert = require('assert');
const path = require('path');
const proxyquire = require('proxyquire');

const dummyPath = path.join(__dirname, '../../../dummy-data/store/simple');
const loadStoreMetadata = proxyquire('../../../../server/Store/helpers/loadStoreMetadata', {
  '../STORE_CONSTANTS': {
    path: dummyPath,
  },
});

describe('server > Store > helpers > loadStoreMetadata', function () {
  it.only('is not being edited', async function () {
    const testStoreMetadata = await loadStoreMetadata();
    assert(!testStoreMetadata.beingEdited);
  });
});
