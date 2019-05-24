const assert = require('assert');

const excludeTagName = require('../../../../../client/src/utils/filter/excludeTagName.js');

describe('client > src > utils > filter > excludeTagName', function () {
  const testTags = {
    color: 'blue',
    name: 'blah',
    time: 5,
  };

  it('Deletes a property of a tag given the property name', async function () {
    console.log(testTags);
    console.log(excludeTagName(testTags, 'name'));
  });

  it('Doesn\'t do anything if the property doesn\'t exist', async function () {
    console.log(testTags);
    console.log(excludeTagName(testTags, 'mom'));
  });

});
