const assert = require('assert');

const postProcessTags = require('../../../../server/Store/helpers/postProcessTags');

describe('server > Store > helpers > postProcessTags', function () {
  // Fake Catalog
  const testCatalogNoTagsToShow = {
    title: 'SEAS Catalog',
    accounts: [26, 30],
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

  const testCatalogAppsMissingTags = {
    title: 'SEAS Catalog',
    accounts: [26, 30],
    defaultSupportEmail: 'example@harvard.edu',
    tagsToShow: [
      {
        name: 'cost',
        color: 'blue',
      },
      {
        name: 'type',
        color: 'red',
      },
    ],
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

  const testCatalogMissingNames = {
    title: 'SEAS Catalog',
    accounts: [26, 30],
    defaultSupportEmail: 'example@harvard.edu',
    tagsToShow: [
      {
        name: 'cost',
        color: 'blue',
      },
      {
        color: 'red',
      },
    ],
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

  const testCatalogAddTag = {
    title: 'SEAS Catalog',
    accounts: [26, 30],
    defaultSupportEmail: 'example@harvard.edu',
    tagsToShow: [
      {
        name: 'cost',
        color: 'blue',
      },
      {
        name: 'type',
        color: 'red',
      },
      {
        name: 'fake tag',
      },
    ],
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

  it('Will update an app so it has each tag found in the tagsToShow', async function () {
    assert.equal(
      postProcessTags(testCatalogAppsMissingTags).apps[1].tags.cost,
      'other/uncategorized',
      'testApp #2\'s cost tag is not being initialized correctly'
    );
  });

  it('Will add a tag to every app if it is in the tagsToShow', async function () {
    testCatalogAddTag.apps.forEach((app) => {
      assert.equal(
        app.tags['fake tag'],
        undefined,
        '\'fake tag\' should be undefined before postProcessTags is called.'
      );
    });
    postProcessTags(testCatalogAddTag).apps.forEach((app) => {
      assert.equal(app.tags['fake tag'], 'other/uncategorized');
    });
  });

  it('Will create a tagsToShow object if there is not already one', async function () {
    assert.equal(testCatalogNoTagsToShow.tagsToShow, undefined);
    assert.equal(
      postProcessTags(testCatalogNoTagsToShow).tagsToShow !== undefined,
      true,
      'The tagsToShow object is still undefined'
    );
  });

  it('Will throw an error if a tag does not have a name key', async function () {
    let errorOccurred = false;
    try {
      postProcessTags(testCatalogMissingNames);
    } catch (err) {
      if (err.message.startsWith('In Catalog')) {
        errorOccurred = true;
      }
    }
    assert.equal(errorOccurred, true);
  });
});
