const assert = require('assert');

const filterByTags = require('../../../../../client/src/utils/filter/filterByTags.js');

describe('client > src > utils > filter > filterByTags', function () {
  const testTagsExpensiveAllTypes = {
    cost: {
      color: 'blue',
      values: {
        free: false,
        expensive: true,
      },
    },
    type: {
      color: 'red',
      values: {
        import: true,
        export: true,
        teaching: true,
      },
    },
  };

  const testTagsFreeTeaching = {
    cost: {
      color: 'purple',
      values: {
        free: true,
        expensive: false,
      },
    },
    type: {
      color: 'yellow',
      values: {
        import: false,
        export: false,
        teaching: true,
      },
    },
  };

  const testTagsNoCosts = {
    cost: {
      color: 'purple',
      values: {
        free: false,
        expensive: false,
      },
    },
    type: {
      color: 'yellow',
      values: {
        import: false,
        export: false,
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
    // Expected Apps are 2 and 4 because they are both 'expensive' and have one
    // of the type tags
    assert.deepEqual(filterByTags(testAppList, testTagsExpensiveAllTypes), [AppTwo, AppFour], 'Returned applist is not equal to the expected apps');
  });

  it('Will not add an app if it doesn\'t have at least one item checked in each tag type', async function () {
    // Expected Apps are none because no app is both free and has teaching
    assert.deepEqual(filterByTags(testAppList, testTagsFreeTeaching), [], 'Returned applist is not equal to the expected apps');
  });

  it('Will return no apps if all the tag values for a tag name are false', async function () {
    assert.deepEqual(filterByTags(testAppList, testTagsNoCosts), [], 'Returned applist is not equal to the expected apps');
  });
});
