const assert = require('assert');

const postProcessTags = require('../../../../server/Store/helpers/postProcessTags');

describe.only('server > Store > helpers > postProcessTags', function () {
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

  it.only('Will update an app so it has each tag found in the tagsToShow', async function () {
    console.log('Catalog before postProcessTags: ', JSON.stringify(testCatalogAppsMissingTags, undefined, 2));
    console.log('Catalog after postProcessTags: ', JSON.stringify(postProcessTags(testCatalogAppsMissingTags), undefined, 2));

  });

  it('Will create a tagsToShow object if there is not already one', async function () {
    console.log('Catalog before postProcessTags: ', JSON.stringify(testCatalogNoTagsToShow, undefined, 2));
    console.log('Catalog after postProcessTags: ', JSON.stringify(postProcessTags(testCatalogNoTagsToShow), undefined, 2));
  });

  it('Will throw an error if a tag does not have a tagName key', async function () {

  });

});
