const assert = require('assert');

const excludeTagName = require('../../../../../client/src/utils/filter/excludeTagName.js');

describe.only('client > src > utils > filter > excludeTagName', function () {
  // This is a fake tag object for testing purposes only
  const testTags = {
    sky: 'blue',
    name: 'blah',
    time: 5, // seconds
  };

  it('Deletes a property of a tag given the property name', async function () {
    const newTags = excludeTagName(testTags, 'name');
    const deleted = !newTags.name;
    assert.equal(deleted, true['\'name\' was not properly deleted from newTags']);
  });

  it('Doesn\'t do anything if the property doesn\'t exist', async function () {
    const newTags = excludeTagName(testTags, 'mom');
    const deleted = !newTags.mom;
    assert.equal(deleted, true);
  });

  it('Does not delete the tagName from the original tags', async function () {
    const newTags = excludeTagName(testTags, 'sky');
    assert.equal(testTags.sky, 'blue');
    assert.equal(newTags.sky, undefined);
  });
});
