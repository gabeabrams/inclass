const assert = require('assert');

const filterByTags = require('../../../../../client/src/utils/filter/filterByTags.js');

describe('client > src > utils > filter > filterByTags', function () {
  const appTest = [
    { name: 'AppOne',
      tags: {
        tagName => {
          color: 'blue',
          items: itemName => true;
        }
      }},
    { name: 'AppTwo',
      tags: {
        tagName => {
          color: 'red',
          items: itemName => false;
        }
      }},
    { name: 'AppThree',
      tags: {
        tagName => {
          color: 'green',
          items: itemName => true;
        }
      }},
  ];




  it('Returns a list of apps that have a given tag name checked', async function () {
    console.log(appTest, tags);

  });

});
