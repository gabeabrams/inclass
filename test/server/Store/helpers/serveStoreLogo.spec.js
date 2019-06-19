const assert = require('assert');
const ExpressApp = require('../../../dummy-objects/ExpressApp');
const serveStoreLogo = require('../../../../server/Store/helpers/serveStoreLogo');

describe.only('server > Store > helpers > serveStoreLogo', function () {
  it('serves logo to expressApp', async function () {
    const myExpressApp = new ExpressApp();
    const logoFullPath = '';

    await serveStoreLogo(logoFullPath);

    // Express.use was called
    assert.equal(myExpressApp.used[0].path, '/public/logo', 'did not call express.use');
  });
});
