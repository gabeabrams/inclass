const api = require('caccl');
const launchInfo = { courseId: };
const detectCatalogAndPermissions = require('../../../../server/Store/helpers/detectCatalogAndPermissions');

describe('server > Store > helpers > detectCatalogAndPermissions', function () {
  it('check accountIds match', async function () {
    const match = detectCatalogAndPermissions(api, launchInfo, catalogs);
    const { catalogId, isAdmin } = match;
    
  });

});
