const path = require('path');
const assert = require('assert');
const readFile = require('../../../../server/Store/helpers/readFile');
const STORE_PATH = require('../../../../server/Store/STORE_PATH');

describe('server > Store > helpers > readFile', function () {
  it('returns error if reading is not successful', async function () {
    let error;
    const wrongPath = path.join(STORE_PATH, 'doesNotExist');
    readFile(wrongPath).catch((err) => {
      // it throws an error
      error = err;
    })
      .then(() => { assert(error); });
  });

  it('returns content if reading is successful', async function () {
    const rightPath = path.join(STORE_PATH, 'dce', 'gradeup', 'metadata.json');
    assert(readFile(rightPath));
  });
});
