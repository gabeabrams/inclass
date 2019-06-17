const assert = require('assert');
const ExpressApp = require('../../../dummy-objects/ExpressApp');
const serveIcon = require('../../../../server/Store/helpers/serveIcon');
const appWithIcon = require('../../../dummy-data/app-lists/appWithIcon');

describe('server > Store > helpers > serveIcon', function () {
  it('returns updated app if there is an icon', async function () {
    const myExpressApp = new ExpressApp();
    const opts = {
      expressApp: myExpressApp,
      catalogId: 'dce',
      appId: 'swipein',
      app: appWithIcon,
    };
    const app = await serveIcon(opts);
    // URL was added
    assert(app.icon.url, 'URL property does not exist for the icon');

    // Express.use was called
    assert.equal(myExpressApp.used[0].path, '/public/dce/swipein/icon', 'did not call express.use');
  });

  it('checks correct url added to icon\'s property', async function () {
    const myExpressApp = new ExpressApp();
    const opts = {
      expressApp: myExpressApp,
      catalogId: 'dce',
      appId: 'swipein',
      app: appWithIcon,
    };
    const app = await serveIcon(opts);
    assert.equal(app.icon.url, '/public/dce/swipein/icon', 'The URL does not match the format ');
  });
});
