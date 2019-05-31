const assert = require('assert');
const path = require('path');
const proxyquire = require('proxyquire');

describe('server > Store > helpers > loadStoreMetadata', function () {
  it.only('is not being edited', async function () {
    const dummyPath = path.join(__dirname, '../../../dummy-data/store/medium');
    const loadStoreMetadata = proxyquire('../../../../server/Store/helpers/loadStoreMetadata', {
      '../STORE_CONSTANTS': {
        path: dummyPath,
      },
    });
    const testStoreMetadata = await loadStoreMetadata();
    assert(!testStoreMetadata.beingEdited);
  });
});
