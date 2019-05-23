const assert = require('assert');

const excludeTagName = require('../../../../../client/src/utils/filter/excludeTagName.js');

describe('client > src > utils > filter > excludeTagName', function () {
  const tags = {
    color: 'blue',
    name: 'blah',
    time: 5,
  };

  tagNameToExclude = 'name';

  console.log(tags);
  tags = excludeTagName(tags, tagNameToExclude);
  console.log(tags);
});
