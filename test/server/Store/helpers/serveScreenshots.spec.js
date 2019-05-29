const express = require('express');
const assert = require('assert');
const serveScreenshots = require('../../../../server/Store/helpers/serveScreenshots');

describe('server > Store > helpers > serveScreenshots', function () {
  it('Does nothing if no screenshot property', async function () {
    const opts = {
      expressApp: express,
      catalogId: 'dce',
      appId: 'gradeup',
      app: '', // TODO
    };
    const app = await serveScreenshots(opts);
    assert.deepEqual(opts.app, Object(app)); // Check if correct syntax
  });

  it('throws error for non-existing file', async function () {

  });

  it('correct url added to all screenshots\' property', async function () {

  });

  it('returns updated app if there are screenshots', async function () {

  });


});
