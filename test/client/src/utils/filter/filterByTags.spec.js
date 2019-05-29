const assert = require('assert');

const testAppList = require('../../../../dummy-data/app-lists/basicAppList');

const filterByTags = require('../../../../../client/src/utils/filter/filterByTags.js');

describe('client > src > utils > filter > filterByTags', function () {

  const testTags = {
    cost: {
      color: 'blue',
      tagValues: {
        free: false,
        expensive: true,
      },
    },
    type: {
      color: 'red',
      tagValues: {
        import: true,
        export: true,
        teaching: true,
      },
    },
  };

  it('Returns a list of apps that have a given tag name checked', async function () {
    assert.equal(filterByTags(testAppList, testTags).length, 2);
    console.log(filterByTags(testAppList, testTags));
  });

  it('Will not add an app if it doesn\'t have at least one item checked in each tag type', async function () {
    assert.equal(filterByTags(testAppList, testTags)[0].name, 'AppTwo');
  });
});
