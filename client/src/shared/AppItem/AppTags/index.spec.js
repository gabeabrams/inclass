import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import AppTags from '.';

describe('client > src > shared > AppItem > AppTags', () => {
  // tag object to pass into AppTags
  const fakeTags = {
    cost: ['expensive', 'cheap', 'medium'],
    type: ['type1', 'type2'],
    example: ['example1'],
  };
  // tagColors object to pass into AppTags
  const fakeTagColors = {
    cost: {
      color: 'blue',
    },
    type: {
      color: 'yellow',
    },
    example: {
      color: 'brown',
    },
  };

  it('Displays the AppTags', async () => {
    const driver = new Driver(
      <AppTags tags={fakeTags} tagColors={fakeTagColors} />
    );
    const html = driver.getHTML('.apptags-tags-list');
    // count the number of tags being rendered, should be 6
    const count = (html.match(/apptag-single-tag/g) || []).length;
    assert.equal(count, 6, 'did not render the number of tags correctly');
  });
});
