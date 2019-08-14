import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import OkayButton from './OkayButton';

describe('client > src > shared > OkayButton', () => {
  it('Displays the OkayButton', async () => {
    // Initialize the driver
    const driver = new Driver(
      <OkayButton text="testText" onClick={() => {}} />
    );
    // check if Cancel Button is rendered on page
    assert(driver.elementExists('.okay-button'), 'did not render okay button correctly');
    assert.equal(driver.getText('.okay-button'), 'testText', 'did not render the correct text');
  });

  it('Handles a click', async () => {
    // Keep track of button clicks
    let clicked = false;

    // Initialize the driver
    const driver = new Driver(
      <OkayButton text="testText" onClick={() => { clicked = true; }} />
    );
    // Simulate a click
    await driver.click('.okay-button');

    // Make sure the button was clicked
    assert(clicked, 'The button did not call onClick');
  });
});
