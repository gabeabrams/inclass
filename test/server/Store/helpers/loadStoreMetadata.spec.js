const assert = require('assert');
const loadStoreMetadata = require('../../../../server/Store/helpers/loadStoreMetadata');

describe('server > Store > helpers > loadStoreMetadata', function () {
  it('is not being edited', async function () {
    const testStoreMetadata = await loadStoreMetadata();
    assert(!testStoreMetadata.beingEdited);
  });
});
