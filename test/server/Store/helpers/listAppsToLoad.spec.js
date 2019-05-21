const listapps = require('../../../../server/Store/helpers/listAppsToLoad');
const assert = require('assert');

describe.only('server > Store > helpers > getAppsToLoad', function () {
  it('returns an object', async function () {
    const test = await listapps();
    assert.deepEqual(test, Object(test));
  });

  it('lists apps of form { catalogId => appId => appPath }', async function () {
    const test = await listapps();
    console.log(test);
  });
});
