const path = require('path');
const assert = require('assert');
const fileExist = require('../../../../server/Store/helpers/fileExists');
const STORE_PATH = require('../../../../server/Store/STORE_PATH');

describe('server > Store > helpers > listFolders', function () {
  it('returns true if file exist', async function () {
    const filePath = path.join(STORE_PATH, 'dce', 'gradeup', 'metadata.json');
    assert(await fileExist(filePath));
  });

  it('return false if file does not exist', async function () {
    const filePath = path.join(STORE_PATH, 'does/not/exist');
    assert(!await fileExist(filePath));
  });

  it('returns true if passed in a directory', async function () {
    const dirPath = path.join(STORE_PATH, '..', 'server/Store/helpers');
    assert(await fileExist(dirPath));
    assert(await fileExist(STORE_PATH));
  });
});
