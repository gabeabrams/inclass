const assert = require('assert');

const filterByTags = require('../../../../../client/src/utils/filter/filterByTags.js');

describe('client > src > utils > filter > filterByTags', function () {
  const appTest = [
   { title: 'Hi', subtitle: 'lala', description: 'this is a cool app!'},
   { title: 'App2', subtitle: 'HI', description: 'BLEE BLOO HEY!'},
   { title: 'blue', subtitle: 'sam', description: 'a COoL apPlIcAtion'},
  ];

  const tags = {
    tagName => {
      color: 'red',
      items: itemName => true
    }
  };

  it.skip('Returns a list of apps that have a given tag name checked', async function () {
    console.log(appTest);



  });
});
