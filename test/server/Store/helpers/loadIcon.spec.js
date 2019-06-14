const path = require('path');
const assert = require('assert');
const ExpressApp = require('../../../dummy-objects/ExpressApp');
const loadIcon = require('../../../../server/Store/helpers/loadIcon');
const appWithIcon = require('../../../dummy-data/app-lists/appWithIcon');
const appWithNoFile = require('../../../dummy-data/app-lists/appWithNoFile');

describe('server > Store > helpers > loadIcon', function () {
  it('does nothing if no icon property', async function () {
    const opts = {
      expressApp: new ExpressApp(),
      catalogId: 'dce',
      appId: 'gradeup',
      app: { title: 'GradeUp', creator: 'dce' },
    };
    const app = await loadIcon(opts);
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
      await loadIcon(opts);
    } catch (err) {
      if (
        err.message.startsWith('The app')
        && err.message.includes('but that file does not exist')
      ) {
        // The correct error occurred
        errorOccurred = true;
      } else {
        // Another error occurred (we didn't expect this!)
        throw err;
      }
    }

    if (!errorOccurred) {
      throw new Error('This test should have thrown error for a non-existant file');
    }
  });

  it('returns updated app if there is an icon', async function () {
    appWithIcon.icon.fullPath = path.join(__dirname, '../../../dummy-data/images/question_mark.png');
    const myExpressApp = new ExpressApp();
    const opts = {
      expressApp: myExpressApp,
      catalogId: 'dce',
      appId: 'swipein',
      app: appWithIcon,
    };
    const app = await loadIcon(opts);
    assert(app.icon.url, 'URL property does not exists for the icon');
  });

  it('checks correct url added to icon\'s property', async function () {
    appWithIcon.icon.fullPath = path.join(__dirname, '../../../dummy-data/images/question_mark.png');
    const myExpressApp = new ExpressApp();
    const opts = {
      expressApp: myExpressApp,
      catalogId: 'dce',
      appId: 'swipein',
      app: appWithIcon,
    };
    const app = await loadIcon(opts);
    assert.equal(app.icon.url, '/public/dce/swipein/icon/question_mark.png', 'The URL does not match the format ');
  });
});
