const assert = require('assert');

const excludeTagName = require('../../../../../client/src/utils/filter/excludeTagName.js');

describe('client > src > utils > filter > excludeTagName', function () {
  const testTags = {
    color: 'blue',
    name: 'blah',
    time: 5,
  };

  it('Deletes a property of a tag given the property name', async function () {
    const newTags = excludeTagName(testTags, 'name');
    const deleted = !newTags.name;
    assert.equal(deleted, true);
  });

  it('Doesn\'t do anything if the property doesn\'t exist', async function () {
    const newTags = excludeTagName(testTags, 'mom');
    const deleted = !newTags.mom;
    assert.equal(deleted, true);
  });
});
