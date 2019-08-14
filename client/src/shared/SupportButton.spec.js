import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import SupportButton from './SupportButton';

describe('client > src > shared > SupportButton', () => {
  it('Displays the SupportButton', async () => {
    // Initialize the driver
    const driver = new Driver(
      <SupportButton onClick={() => {}} />
    );
    // check if Cancel Button is rendered on page
    assert(driver.elementExists('.support-button'), 'did not render okay button correctly');
    assert.equal(driver.getText('.support-button'), 'Contact Support', 'did not render the correct text');
  });

  it('Handles a click', async () => {
    // Keep track of button clicks
    let clicked = false;

    // Initialize the driver
    const driver = new Driver(
      <SupportButton onClick={() => { clicked = true; }} />
    );
    // Simulate a click
    await driver.click('.support-button');

    // Make sure the button was clicked
    assert(clicked, 'The button did not call onClick');
  });
});
