const assert = require('assert');
const listFolders = require('../../../../server/Store/helpers/listFolders');
const STORE_PATH = require('../../../../server/Store/STORE_PATH');

describe('server > Store > helpers > listFolders', function () {
  it('returns the correct list of folders', async function () {
    const testFolders = ['dce', 'pe', 'seas'];
    const folders = await listFolders(STORE_PATH);
    assert.equal(folders.length, testFolders.length);
  });

  it('return the correct folders', async function () {
    const testFolders = ['dce', 'pe', 'seas'];
    const folders = await listFolders(STORE_PATH);
    testFolders.forEach((folder) => {
      assert(folders.includes(folder));
    });
  });
});
