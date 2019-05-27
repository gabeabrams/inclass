const assert = require('assert');
const loadCatalogMetadata = require('../../../../server/Store/helpers/loadCatalogMetadata');

describe('server > Store > helpers > loadCatalogMetadata', function () {
  it('contains all the required fields', async function () {
    const testMetadata = await loadCatalogMetadata('dce');
    const requiredFields = ['title', 'accounts', 'tagColors', 'defaultSupportEmail'];
    Object.keys(testMetadata).forEach((testField) => {
      const index = requiredFields.indexOf(testField);
      if (index !== -1) {
        requiredFields.splice(index, 1);
      }
    });
    assert(requiredFields.length === 0);
  });
});
