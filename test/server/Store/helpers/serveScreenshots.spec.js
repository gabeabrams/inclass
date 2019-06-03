const path = require('path');
const assert = require('assert');
const ExpressApp = require('../../../dummy-objects/ExpressApp');
const serveScreenshots = require('../../../../server/Store/helpers/serveScreenshots');
const appWithScreenshots = require('../../../dummy-data/app-lists/appWithScreenshots');
const appWithNoFile = require('../../../dummy-data/app-lists/appWithNoFile');

describe('server > Store > helpers > serveScreenshots', function () {
  it('does nothing if no screenshot property', async function () {
    const opts = {
      expressApp: new ExpressApp(),
      catalogId: 'dce',
      appId: 'gradeup',
      app: { title: 'GradeUp', creator: 'dce' },
    };
    const app = await serveScreenshots(opts);
    assert.deepEqual(opts.app, app, 'The app returned is not the same app');
  });

  it('throws error for non-existing file', async function () {
    const myExpressApp = new ExpressApp();
    let errorOccurred = false;
    const opts = {
      expressApp: myExpressApp,
      catalogId: 'dce',
      appId: 'swipein',
      app: appWithNoFile,
    };
    try {
      await serveScreenshots(opts);
    } catch (err) {
      errorOccurred = true;
    }

    if (!errorOccurred) {
      throw new Error('This test should have thrown error for a non-existant file');
    }
  });

  it('returns updated app if there are screenshots', async function () {
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
    assert(app.screenshots[0].url, 'URL property does not exists for first screenshot');
    assert(app.screenshots[1].url, 'URL property does not exists for second screenshot');
  });

  it('checks correct url added to all screenshots\' property', async function () {
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
    assert.equal(app.screenshots[0].url, '/public/dce/swipein/screenshots/event_chooser.png', 'The first URL does not match format ');
    assert.equal(app.screenshots[1].url, '/public/dce/swipein/screenshots/man_dash', 'The second URL does not match format');
    assert.equal(myExpressApp.used[0].path, '/public/dce/swipein/screenshots/', 'Express app was not called for first screenshot');
    assert.equal(myExpressApp.used[1].path, '/public/dce/swipein/screenshots/', 'Express app was not called for second screenshot');
    console.log('EXPRESS APP: ', myExpressApp.used[0]);
  });
});
