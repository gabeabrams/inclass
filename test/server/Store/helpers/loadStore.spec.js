const assert = require('assert');
const loadStore = require('../../../../server/Store/helpers/loadStore');

describe('server > Store > helpers > loadStore', function () {
  it('contains correct fields and data is filled', async function () {
    const testStore = await loadStore();
    assert(testStore.store);
    assert(testStore.catalogs);
  });
});
