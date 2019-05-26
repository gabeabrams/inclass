const assert = require('assert');
const getAppParent = require('../../../../server/Store/helpers/getAppParent');

describe('server > Store > helpers > getAppParent', function () {
  const appWithParent = {
    catalogId: 'pe',
    appId: 'swipein',
  };
  const parent = {
    catalogId: 'seas',
    appId: 'swipein',
  };
  const appWithNoParent = {
    catalogId: 'dce',
    appId: 'swipein',
  };
  it('returns null if the app has no parent', async function () {
    const testParent = await
    getAppParent(appWithNoParent.catalogId, appWithNoParent.appId);
    assert(testParent === null);
  });

  it('returns correct appId and catalog if parent exist', async function () {
    const testParent = await
    getAppParent(appWithParent.catalogId, appWithParent.appId);
    assert(testParent.catalogId === parent.catalogId);
    assert(testParent.appId === parent.appId);
  });
});
