const assert = require('assert');

const filterByTags = require('../../../../../client/src/utils/filter/filterByTags.js');

describe('client > src > utils > filter > filterByTags', function () {
  const testApps = [
    {
      name: 'AppOne',
      tags: {
        cost: ['free'],
        type: ['import', 'export'],
      },
    },
    {
      name: 'AppTwo',
      tags: {
        cost: ['expensive'],
        type: ['import'],
      },
    },
    {
      name: 'AppThree',
      tags: {
        cost: ['expensive'],
        type: ['export'],
      },
    },
  ];

  const testTags = {
    cost: {
      color: 'blue',
      tagValues: {
        free: true,
        expensive: false,
      },
    },
    type: {
      color: 'red',
      tagValues: {
        import: true,
        export: true,
      },
    },
  };

  it('Returns a list of apps that have a given tag name checked', async function () {
    // This should be AppOne, AppTwo, AppThree
    console.log(filterByTags(appTest, testTags));
    assert.equal(filterByTags(appTest, testTags).length(), 3);
  });
});
