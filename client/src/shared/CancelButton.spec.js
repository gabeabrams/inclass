import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import CancelButton from './CancelButton';

describe('client > src > shared > CancelButton', () => {
  it('Displays the CancelButton', async () => {
    // Initialize the driver
    const driver = new Driver(
      <CancelButton text="testText" onClick={() => {}} />
    );
    // check if Cancel Button is rendered on page
    assert(driver.elementExists('.cancel-button'), 'did not render Cancel button correctly');
    assert.equal(driver.getText('.cancel-button'), 'testText', 'did not render the correct text');
  });

  it('Handles a click', async () => {
    // Keep track of button clicks
    let clicked = false;

    // Initialize the driver
    const driver = new Driver(
      <CancelButton text="testText" onClick={() => { clicked = true; }} />
    );
    // Simulate a click
    await driver.click('.cancel-button');

    // Make sure the button was clicked
    assert(clicked, 'The button did not call onClick');
  });
});
