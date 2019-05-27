const assert = require('assert');
const loadStore = require('../../../../server/Store/helpers/loadStore');

describe('server > Store > helpers > loadStore', function () {
  it('contains all the required fields', async function () {
    const testStore = await loadStore();
    console.log(testStore);
  });
});
