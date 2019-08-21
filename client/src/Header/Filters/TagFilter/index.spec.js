import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import TagFilter from '.';

describe('client > src > Header > Filters > TagFilter', () => {
  it('Renders a card for a tagName', async () => {
    // Fake props
    const fakeTags = {
      cost: {
        color: 'blue',
        values: 'free',
      },
    };
    const fakeCounts = {
      cost: {
        free: 10,
      },
    };

    // Initialize driver
    const driver = new Driver(
      <TagFilter
        tags={fakeTags}
        tagName="cost"
        onFilterChanged={() => {}}
        counts={fakeCounts}
      />
    );

    // Make sure container is being rendered
    assert(
      driver.elementExists('.tagfilter-container'),
      'Container is missing'
    );

    // Make sure correct tagName is being rendered
    assert.equal(
      driver.getText('.tagfilter-title'),
      'cost',
      'Card is not rendering correct tagName'
    );
  });
});
