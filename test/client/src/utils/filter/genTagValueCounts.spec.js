// Test for genTagValueCount.spec.js

const assert = require('assert');

const genTagValueCounts = require('../../../../../client/src/utils/filter/genTagValueCounts');

describe('client > src > utils > filter > genTagValueCounts', function () {
  const testApps = [
    {
      name: 'AppOne',
      tags: {
        cost: ['free'],
        type: ['import', 'export'],
        language: ['french'],
      },
    },
    {
      name: 'AppTwo',
      tags: {
        cost: ['expensive'],
        type: ['import'],
        language: ['other/uncategorized'],
      },
    },
    {
      name: 'AppThree',
      tags: {
        cost: ['expensive'],
        type: ['export'],
        language: ['french', 'spanish'],
      },
    },
    {
      name: 'AppFour',
      tags: {
        cost: ['free'],
        type: ['grading', 'teaching'],
        language: ['english'],
      },
    },
  ];

  it('Creates counts for each filter tag', async function () {
    const testTagsAllChecked = {
      cost: {
        color: 'blue',
        values: {
          free: true,
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
    const expectedItem = {
      cost: {
        free: 2,
        expensive: 2,
      },
      type: {
        import: 2,
        export: 2,
        teaching: 1,
      },
    };
    const actualItem = genTagValueCounts(testApps, testTagsAllChecked);
    assert.deepEqual(expectedItem, actualItem, 'Expected counts are not equal to actual counts');
  });

  it('Will only count tags marked as true', async function () {
    const testTagsFreeTeaching = {
      cost: {
        color: 'blue',
        values: {
          free: true,
          expensive: false,
        },
      },
      type: {
        color: 'red',
        values: {
          import: false,
          export: false,
          teaching: true,
        },
      },
    };
    const expectedItem = {
      cost: {
        free: 1,
        expensive: 0,
      },
      type: {
        import: 1,
        export: 1,
        teaching: 1,
      },
    };
    const actualItem = genTagValueCounts(testApps, testTagsFreeTeaching);
    assert.deepEqual(expectedItem, actualItem, 'Expected counts are not equal to actual counts');
  });

  it('Will keep an app if it doesn\'t have a tagName', async function () {
    const testTagsExtraValue = {
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
          export: false,
          teaching: true,
        },
      },
      language: {
        color: 'green',
        values: {
          english: true,
          spanish: true,
          french: false,
          'other/uncategorized': true,
        },
      },
    };
    const expectedItem = {
      cost: {
        free: 1,
        expensive: 1,
      },
      type: {
        import: 1,
        export: 1,
        teaching: 0,
      },
      language: {
        english: 0,
        spanish: 0,
        french: 0,
        'other/uncategorized': 1,
      },
    };
    const actualItem = genTagValueCounts(testApps, testTagsExtraValue);
    assert.deepEqual(expectedItem, actualItem, 'Expected counts are not equal to actual counts');
  });
});
