import React from 'react';
import Driver from 'dce-enzyme';
import assert from 'assert';

import SupportButton from './SupportButton';

describe('client > src > Body > App Page > AppPageFooter > InstallButton', () => {
  it('Handles a click', async () => {
    // keep track of button clicks
    let clicked = false;

    // initializes the driver with the support button
    const driver = new Driver(
      <SupportButton
        title="Support Button"
        onClick={() => {
          clicked = true;
        }}
      />
    );
    
    // TODO: check button is visible and text shows
    // simulates a click
    driver.click('#support-button');
    // checks that the button is clicked
    assert(clicked, 'Button did not handle the click');
  });
});
