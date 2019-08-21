import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import TagValueFilterCheckBox from './TagValueFilterCheckBox';

describe('client > src > Header > Filters > TagFilter > TagValueFilter > TagValueFilterCheckBox', () => {
  it('Toggles a check when clicked', async () => {
    let checkboxClicked;

    // Initialize Driver
    const driver = new Driver(
      <TagValueFilterCheckBox
        tagName="cost"
        isChecked={false}
        label="test-checkbox"
        onClick={() => {
          checkboxClicked = true;
        }}
      />
    );

    // Assert that checkbox exists
    assert(
      driver.elementExists('#filter-checkbox-cost-test-checkbox'),
      'Checkbox is missing'
    );
    // Simulate a click
    await driver.toggleCheckbox('#filter-checkbox-cost-test-checkbox');
    // Assert that onClick was called
    assert(!!checkboxClicked, 'Checkbox was not checked');
  });
});
