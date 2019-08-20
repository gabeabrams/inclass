import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import TagValueFilterCount from './TagValueFilterCount';

describe('client > src > Header > Filters > TagFilter > TagValueFilter > TagValueFilterCount', () => {
  it('Renders the app count', async () => {
    const driver = new Driver(
      <TagValueFilterCount
        count={10}
      />
    );

    // Assert that count is rendering with correct value
    assert.equal(
      driver.getText('.tagvaluefiltercount-container'),
      '(10)',
      'App count is not rendering correct number'
    );
  });
});
