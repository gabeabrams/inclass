const path = require('path');
const assert = require('assert');
const ExpressApp = require('../../../dummy-objects/ExpressApp');
const serveScreenshots = require('../../../../server/Store/helpers/serveScreenshots');
const appWithScreenshots = require('../../../dummy-data/app-lists/appWithScreenshots');

describe('server > Store > helpers > serveScreenshots', function () {
  it('Does nothing if no screenshot property', async function () {
    const opts = {
      expressApp: new ExpressApp(),
      catalogId: 'dce',
      appId: 'gradeup',
      app: { title: 'GradeUp', creator: 'dce' },
    };
    const app = await serveScreenshots(opts);
    assert.deepEqual(opts.app, app);
  });

  // it('throws error for non-existing file', async function () {
  //   const opts = {
  //     expressApp: express,
  //     catalogId: 'dce',
  //     appId: 'swipein',
  //     app: appWithScreenshots,
  //   };

  //   const app = await serveScreenshots(opts);
  // });

  it('correct url added to all screenshots\' property', async function () {
    appWithScreenshots.screenshots[0].fullPath = path.join(__dirname, '../../../dummy-data/images/event_chooser.png');
    appWithScreenshots.screenshots[1].fullPath = path.join(__dirname, '../../../dummy-data/images/man_dash.png');
    const myExpressApp = new ExpressApp();
    const opts = {
      expressApp: myExpressApp,
      catalogId: 'dce',
      appId: 'swipein',
      app: appWithScreenshots,
    };
    const app = await serveScreenshots(opts);
    assert.equal(app.screenshots[0].url, '/public/dce/swipein/screenshots/event_chooser.png');
    assert.equal(app.screenshots[1].url, '/public/dce/swipein/screenshots/man_dash');
  });

  // it('returns updated app if there are screenshots', async function () {
  //   const opts = {
  //     expressApp: express,
  //     catalogId: 'dce',
  //     appId: 'swipein',
  //     app: '', // TODO
  //   };
  //   const app = await serveScreenshots(opts);
  //   assert(Object.prototype.hasOwnProperty.call(app.screenshots[0], 'url'));
  // });


});
