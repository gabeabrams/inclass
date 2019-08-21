import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import TagValueFilter from '.';

describe('client > src > Header > Filters > TagFilter > TagValueFilter', () => {
  it('Renders the individual tagValue filters for a specific tag', async () => {
    // Fake props
    const fakeTags = {
      cost: {
        color: 'blue',
        values: {
          free: true,
        },
      },
    };
    const fakeCounts = {
      cost: {
        free: 10,
      },
    };

    // Initialize driver
    const driver = new Driver(
      <TagValueFilter
        tags={fakeTags}
        tagName="cost"
        onFilterChanged={() => {}}
        counts={fakeCounts}
      />
    );

    // Make sure container is being rendered
    assert(
      driver.elementExists('.tagvaluefilter-container'),
      'Container is missing'
    );
  });
});
