const assert = require('assert');

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

  const AppOne = {
    name: 'AppOne',
    tags: {
      cost: ['free'],
      type: ['import', 'export'],
    },
  };
  const AppTwo = {
    name: 'AppTwo',
    tags: {
      cost: ['expensive'],
      type: ['import'],
    },
  };
  const AppThree = {
    name: 'AppThree',
    tags: {
      cost: ['free'],
      type: ['export'],
    },
  };
  const AppFour = {
    name: 'AppFour',
    tags: {
      cost: ['expensive'],
      type: ['teaching'],
    },
  };

  const testAppList = [AppOne, AppTwo, AppThree, AppFour];

  it('Returns a list of apps that have a given tag name checked', async function () {
    assert.deepEqual(filterByTags(testAppList, testTags), [AppTwo, AppFour]);
  });

  it('Will not add an app if it doesn\'t have at least one item checked in each tag type', async function () {
    assert.equal(filterByTags(testAppList, testTags)[0].name, 'AppTwo');
  });
});
