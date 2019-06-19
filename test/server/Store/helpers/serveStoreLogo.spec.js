const assert = require('assert');
const path = require('path');
const ExpressApp = require('../../../dummy-objects/ExpressApp');
const serveStoreLogo = require('../../../../server/Store/helpers/serveStoreLogo');

describe('server > Store > helpers > serveStoreLogo', function () {
  it('serves logo to expressApp', async function () {
    const myExpressApp = new ExpressApp();
    const logoFullPath = path.join(__dirname, '../../../dummy-data/store/medium/logo');

    await serveStoreLogo(logoFullPath, myExpressApp);

    // Express.use was called
    assert.equal(myExpressApp.used[0].path, '/public/logo', 'did not call express.use');
  });
});
