const path = require('path');
const assert = require('assert');
const readJSON = require('../../../../server/Store/helpers/readJSON');
const STORE_PATH = require('../../../../server/Store/STORE_PATH');

describe('server > Store > helpers > readJSON', function () {
  it('throws an error file does not exist', async function () {
    let error;
    const wrongPath = path.join(STORE_PATH, 'doesNotExist');
    readJSON(wrongPath).catch((err) => {
      // it throws an error
      error = err;
    })
      .then(() => { assert(error); });
  });

  it('appends .json if provided', async function () {
    const testPath = path.join(STORE_PATH, 'dce', 'gradeup', 'metadata');
    assert(readJSON(testPath));
  });
});
