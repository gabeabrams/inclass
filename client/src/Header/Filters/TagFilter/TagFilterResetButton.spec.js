import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import TagFilterResetButton from './TagFilterResetButton';

describe('client > src > Header > Filters > TagFilter > TagFilterResetButton', () => {
  it('Renders a button to reset filters', async () => {
    let clicked;

    const driver = new Driver(
      <TagFilterResetButton
        onClick={() => {
          clicked = true;
        }}
        tagName="cost"
      />
    );

    // Simulate a click
    await driver.click('button');
    assert(clicked, 'Button was not clicked');

    // Make sure that inner text is correct
    assert.equal(
      driver.getText('.tagfilterresetbutton-button'),
      'Reset',
      'Button text is incorrect'
    );
  });
});
