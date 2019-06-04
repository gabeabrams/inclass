// Test for genTagValueCount.spec.js

const assert = require('assert');

const genTagValueCounts = require('../../../../client/src/utils/filter/genTagValueCounts');

describe('client > src > utils > filter > genTagValueCounts', function () {
  const testTags = {
    cost: {
      color: 'blue',
      tagValues: {
        free: true,
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
    {
      name: 'AppFour',
      tags: {
        cost: ['free'],
        type: ['grading', 'teaching'],
      },
    },
  ];

  it('Creates counts for each filter tag', async function () {
    console.log('Calling genTagValueCounts');
    genTagValueCounts(testApps, testTags);
  });
});
