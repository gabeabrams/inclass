const assert = require('assert');

const filterByTags = require('../../../../../client/src/utils/filter/filterByTags.js');

describe('client > src > utils > filter > filterByTags', function () {
  const appTest = [
   { tag: {
       tagname => {
         color: 'blue',
         items: (itemName) => { return true; },
      }
    }
  ];

  const tags = {
    (tagName) => {
      color: 'red',
      items: (itemName) => return true;
    }
  };


  it('Returns a list of apps that have a given tag name checked', async function () {
    console.log(appTest, tags);

  });

});
