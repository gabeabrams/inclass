import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import Filters from '.';

describe('client > src > Header > Filters', () => {
  it('Renders the filters container for the filter drawer', async () => {
    // Initialize driver
    const driver = new Driver(
      <Filters
        tags={{}}
        apps={{}}
        onFilterChanged={() => {}}
      />
    );

    // Make sure container is being rendered
    assert(
      driver.elementExists('.filters-container'),
      'Container is missing'
    );
  });
});
