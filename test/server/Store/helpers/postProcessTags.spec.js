const assert = require('assert');

const postProcessTags = require('../../../../server/Store/helpers/postProcessTags');

describe('server > Store > helpers > postProcessTags', function () {
  // Fake Catalog
  const testCatalog = {
    title: 'SEAS Catalog',
    accounts: [26, 30],
    tagsToShow: [
      {
        tagName: 'cost',
        color: 'blue',
      },
      {
        tagName: 'type',
        color: 'red',
      },
    ],
    defaultSupportEmail: 'example@harvard.edu',
    apps: [
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
          cost: ['free'],
          type: ['export'],
        },
      },
      {
        name: 'AppFour',
        tags: {
          cost: ['expensive'],
          type: ['teaching'],
        },
      },
    ],
  };

});
