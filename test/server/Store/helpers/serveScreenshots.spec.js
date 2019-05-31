const assert = require('assert');
const express = require('../../../dummy-objects/ExpressApp');
const serveScreenshots = require('../../../../server/Store/helpers/serveScreenshots');
const appWithScreenshots = require('../../../dummy-data/app-lists/appWithScreenshots');

describe('server > Store > helpers > serveScreenshots', function () {
  it('Does nothing if no screenshot property', async function () {
    const opts = {
      expressApp: express,
      catalogId: 'dce',
      appId: 'gradeup',
      app: { title: 'GradeUp', creator: 'dce' },
    };
    const app = await serveScreenshots(opts);
    assert.deepEqual(opts.app, Object(app)); // Check if correct syntax
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
    const opts = {
      expressApp: express,
      catalogId: 'dce',
      appId: 'swipein',
      app: appWithScreenshots,
    };
    const app = await serveScreenshots(opts);
    Object.values(opts.app.screenshots).forEach((screenshot) => {

    });
    // assert(app.screenshots[0].url === '/public/dce/swipein/screenshots/event_chooser');
    // assert(app.screenshots[1].url === '/public/dce/swipein/screenshots/man_dash');
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
